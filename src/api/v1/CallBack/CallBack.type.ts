export interface CallBack_Schema_Type {
  Name: string;
  Phone: string;
  Date: Date;
  Status: 'Pending' | 'Completed';
  Time: {
    Hours: string;
    Minutes: string;
    Date: string;
    Meridiem: 'AM' | 'PM';
  };
}
