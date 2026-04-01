from fastapi import APIRouter
from app.models import Chilli
from app.services.chilli_service import create_chilli



router = APIRouter()

IMAGE_MAP = {
    "Bishop’s Crown" : "bishop's_crown.jpg"
}

@router.post('/chillies')
def add_user(chilli : Chilli):
    chilli.shuMin = int(chilli.shuMin)
    chilli.shuMax = int(chilli.shuMax)
    filename = IMAGE_MAP.get(chilli.name, 'default.jpg')
    chilli.image_url = f'../chilli_images/{filename}'
    is_available = True
    stock_quantity = 20

    response = create_chilli(chilli, is_available, stock_quantity)

    return {
        'message' : response
    }