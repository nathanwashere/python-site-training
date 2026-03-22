from pydantic import BaseModel

class User(BaseModel):
    fullName : str
    email : str
    age : int
    gender : str

class Project(BaseModel):
    name : str
    amountParticipants : int
    nameSupervisor : str

class RequestData(BaseModel):
    user : User
    project : Project