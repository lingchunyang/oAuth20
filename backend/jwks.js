const jwks = [
    {
      "alg": "RS256",
      "e": "AQAB",
      "kid": "S/OJS62f+5vx6I7ltvh9/9s9TvBctIjZuSpguS5K2Y4=",
      "kty": "RSA",
      "n": "giLV-iCN87bJxC9inyh8Hx7Hc727llliNvK8_1bDirt2eG9TR7MobbgpwfZsKYnNUv6076WlngAXxBcUG1IVeP-_eSW5m-vKo7YIGaWZzkBs6EOVXNY3rrL4Ch0J9zxGWL1ZjZKJE4guUKzgq1h6y03-Uf3LfJ_1xlEAUaY7hVhcwiL8CLKMGMO7zlYiZuqecb1ZWkIhU9Ij6cw-zX6DvOdRoXuJMacnuSf-wm51we-OmTVTdcTshDtXb3St8nDe0MD9aETtRDZRct7ADsb9l_qAJ3vchQg9NU2jYvS_JaHJI7tM4kZMtGuu_znUNegBoy-11uL0yPA188DE0cKEZQ",
      "use": "sig"
    },
    {
      "alg": "RS256",
      "e": "AQAB",
      "kid": "+/2z34MJcb0hCe+kNf33104gsgFmz9Shkvp0fgnbVMw=",
      "kty": "RSA",
      "n": "scsC0XHIFA6EJpAIJgKs9MO61dg_yIw_TZcla5D0cSe3P5Tq1q3jJV0I18zCjIJIyq_ebHPRXhG98rv3u72YxWvB8i-mHvyzAKiK2uN4LgWpyCxLwXTcwRCHaISVYNCxCufRrJHx5xDtXM1LE_v7M4wXzo7GQ9bceRi64oRmfZvCVUH98EaLl6elOEsXcVDNScxl0dECLCrRPnnTRkqy0VIztL05RcHPeKirBybpCvPI4aBuqx32EfBHe8ZRCLushDyMVsZ9m5eEpUuKgFBlBxdS8kB9mtbl39PTSDLNdwIg1yA7hmtTM-1pzd48uSRcnP3Gvv1Eu0dUhArQTrCP4w",
      "use": "sig"
    }
  ];

module.exports = {
    getJwk(kid) {
        return jwks.find(x => x.kid === kid);
    }
}