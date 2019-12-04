const totalVoice = require("totalvoice-node");
const Base64 = require("js-base64").Base64;
const userDb = require("../db/user.js");

class LoginController {
  emailLogin(req, res) {
    const totalVoiceClient = new totalVoice("81b488b24c3958bb17616a607889cfec");

    const email = req.body.email;
    const password = req.body.password;
    const userInDatabase = userDb.getByLogin(email, password);

    if (userInDatabase == undefined) {
      res.status(404).json({
        message: "Invalid credentials"
      });

      const token = {
        type: "2fa-sent",
        userId: userInDatabase.id,
        email: userInDatabase.email,
        sign: "123456789"
      };

      totalVoiceClient.verificacao
        .enviar(userInDatabase.phone, "app-top", 5, false)
        .then(data => {
          token.twoFactionVerificationId = data.dados.id;
          const base64Token = Base64.encode(JSON.stringify(token));

          res.json({
            message: "Autentication success, waiting 2FA validation"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: "Server Error"
          });
        });

        verify2FQ(req, res) {
          const totalVoiceClient = new Totalvoice('81b488b24c3958bb17616a607889cfec');

          const authorizationHeader = req.header('Authorization');
          const token = JSON.parse(Base64.decode(authorizationHeader));

          const userInDatabase = userDb.getById(token.userId);

          const totalVoiceClient.verificacao.buscar(toke.twoFactorVerificationId, req.body.pin).then(data => {
            const permanentToken = {
              type: 'permanent',
              userId: userInDatabase.id,
              email: userInDatabase.email,
              sign: '123456789',
            }

            const base64Token = Base
          })
        }
    }
  }
}
