import { Injectable } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe = new Stripe(
    'sk_test_51KEX6IDrna6aO11d6LpXf2RS8p6bpW1IbLzdQTEkg7EXbCG1AFXt9iuYa0laoDl6r6KLyEoM2ixGx9DsJIGBgIiR00CgDsHVGQ',
    {
      apiVersion: '2020-08-27',
    },
  );

  async findTransaction() {
    const paymentIntents = await this.stripe.paymentIntents.list({
      limit: 3,
      customer: 'cus_L00EmdOlO1zIjc',
    });
    console.log(paymentIntents);

    const balanceTransactions =
      await this.stripe.customers.listBalanceTransactions(
        'cus_KzIKjYqY7Lb3BY',
        { limit: 3 },
      );
    // console.log(balanceTransactions);

    await this.stripe.balanceTransactions.list({});
  }
  async findBalance() {
    return await this.stripe.balance.retrieve();
  }

  async transferToAccount() {
    const transfer = await this.stripe.transfers.create({
      amount: 400,
      currency: 'usd',
      destination: 'acct_1KJdddRjv8XsXITs',
      transfer_group: 'ORDER_95',
    });
  }

  async createBankAccount() {
    const token = await this.stripe.tokens.create({
      bank_account: {
        country: 'US',
        currency: 'usd',
        account_holder_name: 'Jenny Rosen',
        account_holder_type: 'individual',
        routing_number: '110000000',
        account_number: '000123456789',
      },
    });
    const bankAccount = await this.stripe.customers.createSource(
      'cus_KzIKjYqY7Lb3BY',
      { source: token.id },
    );
    return bankAccount;
  }

  async createBankAccountToken() {
    const token = await this.stripe.tokens.create({
      bank_account: {
        country: 'US',
        currency: 'usd',
        account_holder_name: 'Jenny Rosen',
        account_holder_type: 'individual',
        routing_number: '110000000',
        account_number: '000123456789',
      },
    });
    return token;
  }

  async updateAccount() {
    const token = await this.stripe.tokens.create({
      bank_account: {
        country: 'US',
        currency: 'usd',
        account_holder_name: 'Jenny Rosen',
        account_holder_type: 'individual',
        routing_number: '110000000',
        account_number: '000123456789',
      },
    });
    const account3 = await this.stripe.accounts.update(
      'acct_1KJfpJDFFxZCXQBB',
      {
        tos_acceptance: { date: 1642600828, ip: '8.8.8.8' },
        business_type: 'individual',
        business_profile: {
          mcc: '5734', // for Computer Software Stores
          name: 'test102@example.com',
          product_description: 'test',
          support_address: {
            city: 'test',
            country: 'US',
            line1: 'test',
            line2: 'test',
            postal_code: '12345',
            state: 'Colorado',
          },
          support_email: 'test102@example.com',
          support_phone: '0000000000',
          support_url: 'https://google.com',
          url: 'https://google.com',
        },
        individual: {
          address: {
            city: 'Longmont',
            country: 'US',
            line1: '630 15th',
            line2: 'Tower 100 Ave',
            postal_code: '80501',
            state: 'Colorado',
          },
          first_name: 'ali',
          last_name: 'zali',
          email: 'test102@example.com',
          phone: '000 000 0000',
          ssn_last_4: '0000',
          dob: {
            day: 12,
            month: 12,
            year: 1993,
          },
        },
        external_account: token.id,
      },
    );
    return account3;
  }

  async createFullAccount() {
    const token = await this.stripe.tokens.create({
      bank_account: {
        country: 'US',
        currency: 'usd',
        account_holder_name: 'Jenny Rosen',
        account_holder_type: 'individual',
        routing_number: '110000000',
        account_number: '000123456789',
      },
    });
    const account = await this.stripe.accounts.create({
      type: 'custom',
      country: 'US',
      email: 'test109@example.com',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      tos_acceptance: { date: 1642600828, ip: '8.8.8.8' },
      business_type: 'individual',
      business_profile: {
        mcc: '5734', // for Computer Software Stores
        name: 'test109@example.com',
        product_description: 'learning',
        support_address: {
          city: 'San Diego',
          country: 'US',
          line1: '12636 High Bluff Drive',
          line2: 'Suite 400',
          postal_code: '92130',
          state: 'California',
        },
        support_email: 'contact@webcentriq.com',
        support_phone: '3103826757',
        support_url: 'https://webcentriq.com',
        url: 'https://webcentriq.com',
      },
      individual: {
        address: {
          city: 'test', // not empty string, anything is ok
          country: 'US',
          line1: 'test', // not empty string, anything is ok
          line2: 'test', // not empty string, anything is ok
          postal_code: '80501', //important to be correct
          state: 'California', //important to be correct
        },
        first_name: 'ali',
        last_name: 'zali',
        email: 'test109@example.com',
        phone: '000 000 0000',
        ssn_last_4: '0000',
        dob: {
          day: 12,
          month: 12,
          year: 1993,
        },
      },
      external_account: token.id,
    });
    return account;
  }

  async createAccount() {
    const account = await this.stripe.accounts.create({
      type: 'custom',
      country: 'US',
      email: 'test102@example.com',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });
    return account;
  }

  async findBankAccounts() {
    const bankAccounts = await this.stripe.customers.listSources(
      'cus_KzIKjYqY7Lb3BY',
      { object: 'bank_account', limit: 3 },
    );
    return bankAccounts;
  }

  async createCart() {
    const token = await this.stripe.tokens.create({
      card: {
        number: '4242424242424242',
        exp_month: '01',
        exp_year: '23',
        cvc: '314',
        currency: 'usd',
      },
    });
  }

  async payout(body) {
    // const customerFound = await this.stripe.customers.listSources(
    //   'cus_KyxRPCPghRcj5D',
    //   {
    //     object: 'bank_account',
    //     limit: 3,
    //   },
    // );

    // console.log(customerFound.data);

    // const accountCards = await this.stripe.accounts.listExternalAccounts(
    //   'acct_1KJHQiReWzpCkfew',
    //   // { object: 'card', limit: 3 },
    // );
    // console.log(accountCards.data);

    // const accountBankAccounts = await this.stripe.accounts.listExternalAccounts(
    //   'acct_1KEX6IDrna6aO11d',
    //   { object: 'bank_account', limit: 3 },
    // );
    // const source = await this.stripe.sources.create({
    //   type: 'ach_credit_transfer',
    //   currency: 'usd',
    //   owner: {
    //     email: 'jenny.rosen@example.com',
    //   },
    // });

    // console.log(source);

    // const bankAccount = await this.stripe.customers.createSource(
    //   'cus_KyxRPCPghRcj5D',
    //   { source: source.id },
    // );

    // const bankAccount = await this.stripe.customers.createSource(
    //   'cus_KyxRPCPghRcj5D',
    //   { source: 'btok_1KJGrCDrna6aO11dfJSU2MWV' },
    // );
    // console.log(bankAccount.id);

    // const token = await this.stripe.tokens.create({
    //   bank_account: {
    //     country: 'US',
    //     currency: 'usd',
    //     account_holder_name: 'Jenny Rosen',
    //     account_holder_type: 'individual',
    //     routing_number: '110000000',
    //     account_number: '000123456789',
    //   },
    // });

    // const bankAccount = await this.stripe.customers.createSource(
    //   'cus_KyxRPCPghRcj5D',
    //   { source: token.id },
    // );

    // console.log(bankAccount);

    ///////////////////////////////////////////////////////////////////
    // const transfer = await this.stripe.transfers.create({
    //   amount: 400,
    //   currency: 'usd',
    //   destination: 'acct_1KJHQiReWzpCkfew',
    //   transfer_group: 'ORDER_95',
    // });
    // console.log(transfer);
    ///////////////////////////////////////////////////////////////////

    await this.stripe.payouts.create(
      {
        amount: 30,
        currency: 'usd',
        // destination: 'card_1KJcMmDrna6aO11dIrsSP6es',
        destination: 'ba_1KJeKxRjv8XsXITshdcCZIae',
        description: 'test to payout',
        // source_type: 'card',
        // method: 'standard',
      },
      {
        stripeAccount: 'acct_1KJdddRjv8XsXITs',
      },
    );

    return;
  }

  async acceptTerms() {
    const account = await this.stripe.accounts.update('acct_1KJLwKRXcsz2J66R', {
      tos_acceptance: { date: 1609798905, ip: '8.8.8.8' },
    });
  }

  async createStripeAccountTeacher(body) {
    const account = await this.stripe.accounts.create({
      type: 'express',
      country: 'US',
      email: 'aliff@gmail.com',
      business_type: 'individual',
      individual: {
        address: {
          city: 'Colorado',
          country: 'US',
          line1: 'test',
          line2: 'test',
          postal_code: '12345',
          state: 'Colorado',
        },
        first_name: 'ali',
        last_name: 'zali',
        email: 'aliff@gmail.com',
        phone: '000 000 0000',
        ssn_last_4: '0000',
        dob: {
          day: 12,
          month: 12,
          year: 1993,
        },
      },
      external_account: {
        object: 'bank_account',
        account_number: '000999999991',
        routing_number: '110000000',
        country: 'US',
        currency: 'usd',
        account_holder_name: 'ali',
        account_holder_type: 'individual',
      },
      business_profile: {
        url: 'https://google.com',
      },
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      // tos_acceptance: { date: 1609798905, ip: '8.8.8.8' },
    });
    return account;
  }

  async paymentIntent(body) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 2000,
      currency: 'usd',
      payment_method_types: ['card'],
      payment_method: body.payment_method_id,
      confirm: true,
    });
    console.log(paymentIntent);

    return paymentIntent;
  }

  async charges(body) {
    console.log(body);

    const token = body.stripeToken; // Using Express
    if (true) {
      const card = await this.stripe.customers.createSource(
        'cus_KyxCtpy826oPvj',
        { source: token },
      );
    }
    const charge = await this.stripe.charges.create({
      amount: 666,
      currency: 'usd',
      description: 'Example charge24',
      source: token,
      customer: 'cus_KyxCtpy826oPvj',
    });
    return charge;
  }

  async createUserAndCharge(body) {
    console.log(body);

    try {
      this.stripe.customers
        .create({
          name: body.name,
          email: body.email,
          source: body.stripeToken,
        })
        .then((customer) =>
          this.stripe.charges.create({
            amount: body.amount * 100,
            currency: 'usd',
            customer: customer.id,
            description: 'Thank you for your generous donation.',
          }),
        )
        .then(() => console.log('done')) //res.render('complete.html'))
        .catch((err) => console.log(err));
    } catch (err) {
      // res.send(err);
      console.log(err);
    }
  }
  create(createStripeDto: CreateStripeDto) {
    return 'This action adds a new stripe';
  }

  findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }

  update(id: number, updateStripeDto: UpdateStripeDto) {
    return `This action updates a #${id} stripe`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripe`;
  }
}
