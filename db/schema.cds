using { Currency, managed, sap } from '@sap/cds/common';
namespace cap_tutorial; 


entity Users : managed {
  key User_id : Integer;
  Full_name : String;
  Email : String;
  Office : String;
  Role : String; 
  Password : String; // Consider encryption
  Created_at : DateTime;
  Updated_at : DateTime;
  Last_login : DateTime;
  Account_status : Integer; 
}


entity Students : managed {
  @title : 'DB ID'
  key Student_db_id : Integer;
  @title : 'Full NAme'
  Full_name : String;
  @title : 'Gender'
  Gender : String;
  @title : 'Office'
  Office : String;
  @title : 'Advisor'
  Advisor : Integer;//Association to Users;
  @title : 'Created AT'
  Created_at : DateTime;
  @title : 'Planned Study Date'
  Planned_study_date : Date;
}

entity Student_communications : managed {
  key Id : Integer;
  Student_db_id : Association to Students;
  User_id : Association to Users;
  Message : String; 
  Created_date : DateTime;
  Updated_date : DateTime;
  Updated_by : Association to Users;
}

entity Schools : managed {
  key School_id : Integer;
  School_name : String;
  Country : String;
  Creatd_at : DateTime; 
}

entity School_courses : managed {
  key Course_id : Integer;
  School_id : Association to Schools;
  Course_name : String;
  Status : Integer;
  Created_at : DateTime;
  Updated_at : DateTime;
}

entity Student_applications : managed {
  key Application_id : Integer;
  Student_db_id : Association to Students;
  Course_id : Association to School_courses;
  Inserted_by : Association to Users;
  Start_date : DateTime;
  Note : String;
  Created_at : DateTime;
  Updated_at : DateTime;
  Final_choice : String;
  Is_deferred : String;
  Application_status : String;
}
