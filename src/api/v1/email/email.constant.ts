type Mail_Type = {
  MAIL_SENT_SUCCESS: string;
  MAIL_SENT_FAILED: string;
};

const Mail_Constant: Mail_Type = {
  MAIL_SENT_SUCCESS: 'Mail sent successfully',
  MAIL_SENT_FAILED: 'Mail sent failed',
};

export default Object.freeze(Mail_Constant);
