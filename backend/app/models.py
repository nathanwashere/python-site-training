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

class Chilli(BaseModel):
    name : str
    description : str
    image_url : str = ''
    origin : str
    color : str
    shuMin : int
    shuMax : int
    season : str
