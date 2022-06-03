var faker =  require('faker')
var cpf = require('gerador-validador-cpf')
export default {

    deliver: function(){

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()
        var data = {
        name: `${firstName} ${lastName}`,
        cpf: cpf.generate(),
        email: faker.internet.email(firstName),
        whatsapp:  '99888899999',
        address: {
            postalcode: '67113710',
            street: 'Rua Quatorze A',
            number: '9',
            details: 'rua da igreja',
            district: 'Coqueiro',
            city_state: 'Ananindeua/PA'
        },
        delivery_method: 'Moto',
        cnh: 'cnh-digital.jpg'
        }
        return data
    }
}