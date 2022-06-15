import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post('payment-intent')
  async paymentIntent(@Body() body) {
    return await this.stripeService.paymentIntent(body);
  }

  @Post('charges')
  async charges(@Body() body) {
    return await this.stripeService.charges(body);
  }

  @Post('create-user-and-charge')
  async createUserAndCharge(@Body() body) {
    return await this.stripeService.createUserAndCharge(body);
    // res.render('complete.html');
  }

  @Put()
  async acceptTerms() {
    const acceptTerms = await this.stripeService.acceptTerms();
    return;
  }

  @Post('transfer-to-account')
  transferToAccount() {
    return this.stripeService.transferToAccount();
  }

  @Get('transaction')
  findTransaction() {
    return this.stripeService.findTransaction();
  }

  @Get('balance')
  findBalance() {
    return this.stripeService.findBalance();
  }

  @Get('token')
  createBankAccountToken() {
    return this.stripeService.createBankAccountToken();
  }

  @Get()
  findBankAccounts() {
    return this.stripeService.findBankAccounts();
  }
  @Post('create-bank-account')
  createBankAccount() {
    return this.stripeService.createBankAccount();
  }
  @Post('create-full-account')
  createFullAccount() {
    return this.stripeService.createFullAccount();
  }
  @Post('create-account')
  createAccount() {
    return this.stripeService.createAccount();
  }
  @Put('update-account')
  updateAccount() {
    return this.stripeService.updateAccount();
  }

  @Post('create-card')
  async createCart() {
    return await this.stripeService.createCart();
  }

  @Post('payout')
  async payout(@Body() body) {
    const result = await this.stripeService.payout(body);
    console.log('result', result);
    return result;
  }

  @Post('create-account-teacher')
  async createStripeAccountTeacher(@Body() body) {
    const result = await this.stripeService.createStripeAccountTeacher(body);
    console.log('result', result);
    return result;
  }
  @Post()
  create(@Body() createStripeDto: CreateStripeDto) {
    return this.stripeService.create(createStripeDto);
  }

  @Get()
  findAll() {
    return this.stripeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStripeDto: UpdateStripeDto) {
    return this.stripeService.update(+id, updateStripeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stripeService.remove(+id);
  }
}
