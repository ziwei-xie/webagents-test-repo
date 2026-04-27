namespace hello.world;

using { cuid } from '@sap/cds/common';

/**
 * A simple Greetings entity to store greeting messages.
 */
entity Greetings : cuid {
  name    : String(100) default 'World';
  message : String(200);
}