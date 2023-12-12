using { cap_tutorial as my } from '../db/schema';
namespace cap_tutorial; 

service AppsService  { 
  entity Student_applications as projection on my.Student_applications;

}