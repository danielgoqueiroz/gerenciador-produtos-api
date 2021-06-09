var should = require("should");
var request = require("request");
var expect = require("chai").expect;

it("Deve iniciar servidor.", function (done) {
  request.get(
    {
      url: process.env.URL_BASE,
    },
    function (error, response, body) {
      expect(response.statusCode).to.equal(200);

      // agora, verificamos se retornou a propriedade cards
      if (_body.should.have.property("cards")) {
        //se retornou, vamos verificar o tamanho, deve ser menor ou igual a 100 itens
        expect(_body.cards).to.have.lengthOf.at.most(100);
      }

      done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
    }
  );
});
