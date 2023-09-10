import { _Request, _NextFunction, _Response } from "@/global";
import ConsumerService from "@/services/consumers.service";

class ConsumersController {
  private consumerService: ConsumerService;

  constructor() {
    this.consumerService = new ConsumerService();
  }

  getConsumers = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const response = this.consumerService.getConsumers();
      res.json({ status: "OK", msg: "success", payload: response });
    } catch (error) { next(error) }
  }

  findConsumer = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const consumerId = req.params.consumerId;
      const response = await this.consumerService.findConsumer(consumerId);
      res.json({ status: "OK", msg: "success", payload: response });
    } catch (error) { next(error) }
  }

  // not done need themes model
  getConsumerThemes = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {

    } catch (error) { next(error) }
  }

  // not done need posts model
  getConsumerFeed = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {

    } catch (error) { next(error) }
  }

  createConsumer = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const body = req.body;
      const newAccount = {
        name: body.name,
        username: body.username,
        email: body.email,
        password: body.password,
        avatar: body.avatar,
        bio: body.bio
      }
      const response = await this.consumerService.createConsumer(newAccount);
      res.json({ status: "OK", msg: "success", payload: response });
    } catch (error) { next(error) }
  }

  updateConsumer = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const consumerId = req.params.consumerId;
      const updateData = {
        name: req.body.name,
        username: req.body.username,
        bio: req.body.bio,
        avatar: req.body.avatar
      }
      const response = await this.consumerService.updateConsumer(consumerId, updateData);
      res.json({ status: "OK", msg: "success", payload: response });
    } catch (error) { next(error) }
  }

  // not done needs theme model
  addConsumerTheme = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {

    } catch (error) { next(error) }
  }

  // not done needs theme model
  removeConsumerTheme = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {

    } catch (error) { next(error) }
  }
}

export default ConsumersController;
