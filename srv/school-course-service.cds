using { cap_tutorial as my } from '../db/schema';
namespace cap_tutorial; 

service SchoolCourseService  { 
  entity School_courses as projection on my.School_courses;

}