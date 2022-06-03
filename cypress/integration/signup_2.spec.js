

describe('Cadastro', ()=>{
    //Cenario 01
    it('Usuário deve se tornar um entregador', ()=> {
    //    cy.viewport(1920, 1080)
    //    cy.visit('https://buger-eats.vercel.app/')
        
        cy.get('a[href="/deliver"]').click()   //cy.get é para buscar 
        cy.get ('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas') //checkpoint

        var entregador = {
            nome: 'Jefferson Monteiro',
            cpf: '70491292082',
            email: 'jeffmonteiroo@gmail.com',
            whatsapp:  '99888899999',
            endereco: {
                cep: '67113710',
                rua: 'Rua Quatorze A',
                numero: '9',
                complemento: 'rua da igreja',
                bairro: 'Coqueiro',
                cidade_uf: 'Ananindeua/PA'
            },
            metodo_entrega: 'Moto',
           // cnh: '../fixtures/images/cnh-digital.jpg'
           cnh: 'cnh-digital.jpg'
        
        }

      
        cy.get('input[name="name"]').type(entregador.nome)
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento)

        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)


        cy.contains('.delivery-method li', entregador.metodo_entrega).click()
        cy.get('input[accept^="image"]').attachFile('/images/'+ entregador.cnh)
       //cy.get('input[accept^="image"]').attachFile(entregador.cnh)

              
        // o simbolo ^ para buscar quando começa com a palavra seguida do simbolo
        // o simbolo $ para buscar quando termina com a palavra seguida do simbolo
        // o simbolo * para buscar quando contem  a palavra seguida do simbolo
        
        cy.get('form button[type="submit"]').click()
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', expectedMessage)
        
    })

    //Cenario 02 
    it('CPF inválido', ()=> { 
//
 //       cy.visit('https://buger-eats.vercel.app/')
        
        cy.get('a[href="/deliver"]').click()   //cy.get é para buscar 
        cy.get ('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas') //checkpoint

        var entregador = {
            nome: 'Jefferson Monteiro',
            cpf: '000012920AA',
            email: 'jeffmonteiroo@gmail.com',
            whatsapp:  '99888899999',
            endereco: {
                cep: '67113710',
                rua: 'Rua Quatorze A',
                numero: '9',
                complemento: 'rua da igreja',
                bairro: 'Coqueiro',
                cidade_uf: 'Ananindeua/PA'
            },
            metodo_entrega: 'Moto',
           // cnh: '../fixtures/images/cnh-digital.jpg'
           cnh: 'cnh-digital.jpg'
        
        }

      
        cy.get('input[name="name"]').type(entregador.nome)
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento)

        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)


        cy.contains('.delivery-method li', entregador.metodo_entrega).click()
        cy.get('input[accept^="image"]').attachFile('/images/'+ entregador.cnh)
       //cy.get('input[accept^="image"]').attachFile(entregador.cnh)

              
        // o simbolo ^ para buscar quando começa com a palavra seguida do simbolo
        // o simbolo $ para buscar quando termina com a palavra seguida do simbolo
        // o simbolo * para buscar quando contem  a palavra seguida do simbolo
        
        cy.get('form button[type="submit"]').click()
        const expectedMessage = 'Oops! CPF inválido'
        cy.get('.alert-error').should('have.text', expectedMessage)
        
    })
})


import signupPage from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'

describe('Signup', () => {

    // beforeEach(function () {
    //     cy.fixture('deliver').then((d) => {
    //         this.deliver = d
    //     })
    // })

		it('User should be deliver', function () {

			var deliver = signupFactory.deliver()

			signupPage.go()
			signupPage.fillForm(deliver)
			signupPage.submit()

			const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
			signupPage.modalContentShouldBe(expectedMessage)
		})

    it('Incorrect document', function () {

        var deliver = signupFactory.deliver()

        deliver.cpf = '000000141aa'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', function () {

        var deliver = signupFactory.deliver()

        deliver.email = 'user.com.br'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShouldBe(msg.output)
            })
        })

    })

})