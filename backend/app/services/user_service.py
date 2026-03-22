from app.db import get_connection

def create_user(user):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO users (name, email, age, gender)
        VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query,(
            user.fullName,
            user.email,
            user.age,
            user.gender
        ))

        conn.commit()
        cursor.close()
        conn.close()

        return "User has been created!"
    except Exception as e:
        print("Error while trying to create user:\n ",e)
        return "User has not been created = ERROR!"