module.exports = (req, res) => {
  const url = process.env.WHOP_LINK;
  if (url) {
    res.writeHead(302, { Location: url });
    res.end();
  } else {
    res.writeHead(302, { Location: '/#membership' });
    res.end();
  }
};
