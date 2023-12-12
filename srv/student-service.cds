using { cap_tutorial as my } from '../db/schema';


service StudentServices@(path:'/StudentServices') { 
  entity Students as projection on my.Students;




}
