from fastapi import APIRouter
from app.models import Project, User, RequestData
from app.services.user_service import create_user

router = APIRouter()

@router.post('/info')
def add_user(data : RequestData):
    user : User = data.user
    project : Project = data.project
    user.age = int(user.age)
    response = create_user(user)

    return {
        'message' : response
    }