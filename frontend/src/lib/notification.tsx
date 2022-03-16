enum NotificationType {
  DIALOG = 1 << 0,
  SNACKBAR = 1 << 1,
  ALL = DIALOG | SNACKBAR,
}

export class Notification {
  static NotificationType = NotificationType;
  type: NotificationType = NotificationType.DIALOG;
  message: string = '';
  id: string;
  seen: boolean = false;
  url?: string;
  date: number | string = new Date().getTime();

  constructor(type?: NotificationType, message?: string, date?: number | string) {
    if (type) {
      this.type = type;
    }
    if (message) {
      this.message = message;
    }
    if (date) {
      this.date = date;
    }
    // generate the id based on the message and the date attached to a notification
    this.id = btoa(`${this.date},${this.message}`);
  }
}
