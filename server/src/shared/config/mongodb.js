import mongoose from 'mongoose'
import logger from './logger'
import config from './index'

//singleton design pattern for MongoDB connection : it states that a class has only one instance and provides a global point of access to it. This is useful for managing resources like database connections, where you want to ensure that only one connection is created and shared across the application. 
class MongodbConnection {
  constructor() {
    this.connection = null;
  }
  
}