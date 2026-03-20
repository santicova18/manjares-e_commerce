from app.repo.base_repo import BaseRepository
from app.models import Admin

class AdminRepository(BaseRepository[Admin]):
    def __init__(self, db):
        super().__init__(Admin, db)