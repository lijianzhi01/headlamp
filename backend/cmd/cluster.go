package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"path"
	"path/filepath"

	_ "k8s.io/client-go/plugin/pkg/client/auth/oidc"
	"k8s.io/client-go/rest"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
)

// @todo: Use a different way to avoid name clashes with other clusters.
const OwnClusterName = "main"

type Cluster struct {
	Name     string `json:"name"`
	Server   string `json:"server,omitempty"`
	config   *clientcmdapi.Cluster
	AuthType string `json:"auth_type"`
}

type ClusterReq struct {
	Name   string `json:"name"`
	Server string `json:"server"`
	// InsecureSkipTLSVerify skips the validity check for the server's certificate.
	// This will make your HTTPS connections insecure.
	// +optional
	InsecureSkipTLSVerify bool `json:"insecure-skip-tls-verify,omitempty"`
	// CertificateAuthorityData contains PEM-encoded certificate authority certificates. Overrides CertificateAuthority
	// +optional
	CertificateAuthorityData []byte `json:"certificate-authority-data,omitempty"`
}

func GetClusterOidcConfig(clusterName string) (*OidcConfig, error) {
	if oidcConfig, ok := oidcConfigCache[clusterName]; ok {
		return oidcConfig, nil
	}

	return nil, fmt.Errorf("couln't find auth config for cluster %s", clusterName)
}

func GetOwnCluster(headlampConfig *HeadlampConfig) (*Cluster, error) {
	config, err := rest.InClusterConfig()
	if err != nil {
		return nil, err
	}

	authProvider := ""

	if headlampConfig.oidcIdpIssuerURL != "" {
		authProvider = "oidc"

		var oidcConfig OidcConfig

		oidcConfig.ClientID = headlampConfig.oidcClientID
		oidcConfig.ClientSecret = headlampConfig.oidcClientSecret
		oidcConfig.IdpIssuerURL = headlampConfig.oidcIdpIssuerURL
		oidcConfig.Scopes = headlampConfig.oidcScopes

		oidcConfigCache[OwnClusterName] = &oidcConfig
	}

	cluster := &clientcmdapi.Cluster{
		Server:                   config.Host,
		CertificateAuthority:     config.TLSClientConfig.CAFile,
		CertificateAuthorityData: config.TLSClientConfig.CAData,
	}

	return &Cluster{Name: OwnClusterName, Server: config.Host, config: cluster, AuthType: authProvider}, nil
}

func (c *Cluster) getServer() *string {
	return &c.Server
}

func (c *Cluster) getName() *string {
	return &c.Name
}

// pathRelativeToBase returns either an absolute path, or a relative path prefixed with base.
// Examples:
//
//	pathRelativeToBase("/etc", "passwd") -> "/etc/passwd"
//	pathRelativeToBase("/etc", "/etc/passwd") -> "/etc/passwd"
func pathRelativeToBase(base string, dest string) string {
	if filepath.IsAbs(dest) {
		return dest
	}

	return path.Join(base, dest)
}

func (c *Cluster) getCAData() ([]byte, error) {
	if c.config.CertificateAuthority != "" {
		// paths inside the config are relative to the config.
		configDir := filepath.Dir(c.config.LocationOfOrigin)
		caPath := pathRelativeToBase(configDir, c.config.CertificateAuthority)

		pemBytes, err := ioutil.ReadFile(caPath)
		if err == nil {
			return pemBytes, nil
		}

		log.Println("Failed to add certificate:", err)

		return nil, fmt.Errorf("failed to add certificate for cluster %q: %w", c.Name, err)
	}

	if caData := c.config.CertificateAuthorityData; len(caData) > 0 {
		return caData, nil
	}

	return nil, fmt.Errorf("no certificate authority data found for cluster %s", c.Name)
}

func (c *Cluster) shouldVerifyTLS() bool {
	return !c.config.InsecureSkipTLSVerify
}
