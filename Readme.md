
Dhruvi Bhatt 


Note-Taking App having following functionalities:

- User can Login
- User can Register
- See Account Profile
- See Created Notes
- See Archieved / Trash Notes
- Create Notes 
- Update Notes
- Delete Notes
- Archieve Notes
- Trash Notes
- Unarchieve Notes
- Restore Notes From Trash
- Delete Notes forever From Trash

API-Calls

Users Links

- POST                           http://localhost:5000/user/register       
- POST                           http://localhost:5000/user/login          
- GET                            http://localhost:5000/user/authenticated   

- GET                            http://localhost:5000/user/logout         
- PUT                            http://localhost:5000/user/update         

Notes Links

- POST FOR INSERT                http://localhost:5000/user/note           
- GET FOR GETTING ARCHIEVE NOTES http://localhost:5000/user/notes/archive  
- PUT FOR ARCHIEVE NOTES         http://localhost:5000/user/note/archive   
- PUT FOR TRASH NOTES            http://localhost:5000/user/note/trash     
- PUT                            http://localhost:5000/user/notes/update   

- GET                            http://localhost:5000/user/notes          
- DELETE                         http://localhost:5000/user/notes/delete   
- GET FOR GETTING TRASHED NOTES  http://localhost:5000/user/notes/trash    
