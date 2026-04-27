using { hello.world as hw } from '../db/schema';

/**
 * Hello Service — exposes greetings and a custom hello action.
 */
service HelloService @(path: '/api/hello') {
  entity Greetings as projection on hw.Greetings;

  /** Returns a personalized greeting message */
  function greet(name: String) returns String;
}