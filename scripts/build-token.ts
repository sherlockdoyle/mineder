const username = process.argv[2] ?? '',
  password = process.argv[3] ?? '';
console.log(`Username: '${username}'`);
console.log(`Password: '${password}'`);

crypto.subtle
  .digest('SHA-256', new TextEncoder().encode(`${username}:${password}`))
  .then(hash => console.log(Buffer.from(hash).toString('base64')));
