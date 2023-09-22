import img from './error.gif';

function ErrorMessage() {
  return (
    // process.env.PUBLIC_URL - ссылка на папку public `process.env.PUBLIC_URL + '/error.gif'`
    <img
      style={{
        display: 'block',
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        margin: '0 auto',
      }}
      src={img}
      alt="error"
    />
  );
}

export default ErrorMessage;
