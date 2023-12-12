using { cap_tutorial as my } from '../db/schema';
namespace cap_tutorial; 

service CommService  { 
  entity Student_communications as projection on my.Student_communications;

}