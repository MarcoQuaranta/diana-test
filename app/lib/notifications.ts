export const sendNotification = (message: string) => {
  fetch('https://ntfy.sh/roscetta', {
    method: 'POST',
    headers: {
      'Title': 'Ricciolino Prime: Roscetta',
      'Tags': 'heart',
      'Priority': 'high'
    },
    body: message
  }).catch(() => {});
};
