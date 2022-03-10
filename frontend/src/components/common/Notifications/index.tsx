import bellIcon from '@iconify/icons-mdi/bell';
import { Icon } from '@iconify/react';
import { Badge, Grid, IconButton, makeStyles, Theme, Tooltip, Typography } from '@material-ui/core';
import { Menu, MenuItem } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Event, { KubeEvent } from '../../../lib/k8s/event';
import { Notification } from '../../../lib/notification';
import { createRouteURL } from '../../../lib/router';
import { timeAgo } from '../../../lib/util';
import { setUINotifications, updateUINotification } from '../../../redux/actions/actions';
import { useTypedSelector } from '../../../redux/reducers/reducers';

const useStyles = makeStyles((theme: Theme) => ({
  notificationItem: {
    '&.MuiMenuItem-root': {
      borderBottom: `1px solid ${theme.palette.notificationBorderColor}`,
      padding: '1rem',
    },
  },
  notificationMessage: {
    '&': {
      wordBreak: 'break-word',
      whiteSpace: 'normal',
    },
  },
  root: {
    '& .MuiPaper-root': {
      width: '30vw',
      minWidth: '300px',
      maxHeight: '400px',
    },
  },
  errorItem: {
    '&': {
      color: theme.palette.error,
    },
  },
}));

function prepareNotificationsList(
  notifications: Notification[],
  clickEventHandler: (notification?: Notification) => void
) {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  if (!notifications || notifications.length === 0) {
    return (
      <MenuItem
        onClick={() => clickEventHandler()}
        className={classes.notificationItem}
        disabled
      >
        {t(`frequent|You don't have any notifications right now`)}
      </MenuItem>
    );
  }

  function notificationSeenUnseenHandler(notification?: Notification) {
    if (!notification) {
      return;
    }
    notification.seen = true;
    clickEventHandler(notification);
  }

  return notifications?.map((notification, index: number) => {
    return (
      <MenuItem key={`${notification}__${index}`} className={classes.notificationItem}>
        <Grid
          container
          justifyContent="space-between"
          spacing={1}
          onClick={() => notification.url && history.push(notification.url)}
        >
          <Grid item md={notification.seen ? 11 : 10}>
            <Typography style={{ fontWeight: notification.seen ? 'normal' : 'bold' }}>
              {notification.message}
            </Typography>
          </Grid>
          {!notification.seen && (
            <Grid item md={1}>
              <Badge
                variant="dot"
                color="error"
                onClick={() => notificationSeenUnseenHandler(notification)}
              ></Badge>
            </Grid>
          )}
          <Grid item md={12}>
            {timeAgo(new Date(notification.date))}
          </Grid>
        </Grid>
      </MenuItem>
    );
  });
}

export default function Notifications() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const notifications = useTypedSelector(state => state.ui.notifications);
  const dispatch = useDispatch();
  const [events] = Event.useList();
  const { t } = useTranslation();

  useEffect(() => {
    if (events && events.length !== 0) {
      const importantEvents: Notification[] = events
        .filter((event: KubeEvent) => event.type !== 'Normal')
        .map((event: KubeEvent) => {
          const notificationIndexFromStore = notifications.findIndex(
            notification => notification.id === event.metadata.uid
          );
          if (notificationIndexFromStore !== -1) {
            return notifications[notificationIndexFromStore];
          }
          const notification = new Notification();
          notification.date = new Date(event.metadata.creationTimestamp).getTime();
          notification.id = event.metadata.uid;
          notification.message = event.message;
          notification.url = createRouteURL('cluster') + `?eventsFilter=${notification.id}`;
          return notification;
        });
      // we are here means the events list changed and we have now new set of events, so we will notify the store about it
      dispatch(setUINotifications(importantEvents));
    }
  }, [events]);

  function handleNotificationsWithStorage() {
    const notificationsInStorage = localStorage.getItem('notifications');
    if (notificationsInStorage) {
      const parsedNotifications = JSON.parse(notificationsInStorage);
      dispatch(setUINotifications(parsedNotifications));
    }
  }

  useEffect(() => {
    handleNotificationsWithStorage();
  }, []);

  useEffect(() => {
    handleNotificationsWithStorage();
  }, [notifications.length]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function menuItemClickHandler(notification?: Notification) {
    if (notification) {
      dispatch(updateUINotification(notification));
    }
  }
  const areThereUnseenNotifications =
    notifications.filter(notification => notification.seen !== true).length > 0;

  return (
    <>
      <IconButton onClick={handleClick}>
        {areThereUnseenNotifications ? (
          <Badge variant="dot" color="error">
            <Tooltip title={`${t('notifications|You have unread notifications')}`}>
              <Icon icon={bellIcon} />
            </Tooltip>
          </Badge>
        ) : (
          <Icon icon={bellIcon} />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted={false}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.root}
        getContentAnchorEl={null}
        PaperProps={{}}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {prepareNotificationsList(notifications, menuItemClickHandler)}
      </Menu>
    </>
  );
}
