using { cap_tutorial as my } from '../db/schema';
namespace cap_tutorial; 

service SchoolsService  { 
  entity Schools as projection on my.Schools;

}