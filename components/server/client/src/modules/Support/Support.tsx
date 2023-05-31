import { Box, Container, Typography } from '@mui/material';

const Support = () => {
  return (
    <Container maxWidth="md" sx={styles.container}>
      <Typography>{`Minibrands tracker was developed by Isaac Parsons, with help from his wonderful girlfriend who helped generate all the minibrands icons as well as providing constant feedback and morale support.`}</Typography>
      <Typography>{`This website is hosted entirely out of pocket so if you would like to support the website you can donate using the link below 🥰`}</Typography>
      <Box sx={styles.paypalBtn}>
        <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_blank"
        >
          <input type="hidden" name="business" value="FXRVW6TEYMSAW" />
          <input type="hidden" name="no_recurring" value="0" />
          <input type="hidden" name="currency_code" value="CAD" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
          <img
            alt=""
            src="https://www.paypal.com/en_CA/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      </Box>
    </Container>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: 3
  },
  paypalBtn: {
    display: 'flex',
    justifyContent: 'center',
    padding: 1
  }
};

export default Support;
