import express, { Router } from "express";

export class AppRouter {
  private static _instance: Router;

  static getInstance() {
    if (!AppRouter._instance) {
      AppRouter._instance = Router();
    }
    return AppRouter._instance;
  }
}