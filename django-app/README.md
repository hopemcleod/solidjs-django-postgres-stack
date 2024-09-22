docker run --name patient-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=p@ssw0rd -e POSTGRES_DB=patients -p 5432:5432 -d postgres

Steps to Set Up PostgreSQL and Migrations:
1. Set Up PostgreSQL (Docker Option)
If you're running PostgreSQL in a Docker container, you can set it up using the following Docker command:

bash
Copy code
docker run --name my-postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres
myuser, mypassword, and mydatabase are your custom database username, password, and database name.
This will spin up a PostgreSQL instance on port 5432.

2. Configure Django to Use PostgreSQL
Update your DATABASES setting in settings.py to point to your PostgreSQL database:

python
Copy code
# patients_api/settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydatabase',  # your PostgreSQL database name
        'USER': 'myuser',      # your PostgreSQL username
        'PASSWORD': 'mypassword',  # your PostgreSQL password
        'HOST': 'localhost',   # or '127.0.0.1' if running locally
        'PORT': '5432',        # PostgreSQL default port
    }
}
3. Apply Migrations
Once PostgreSQL is running and Django is configured, you can run the migrations to create the necessary tables in the database:

bash
Copy code
python manage.py makemigrations
python manage.py migrate
This will apply the migrations and create the tables for your models (including the Patient model) in the PostgreSQL database.
makemigrations only creates the instructions for changing the database.
It doesn't apply these changes to your database.

4. Verify the Connection
You can verify that Django is connected to PostgreSQL by running the following:

python manage.py dbshell - I'm using docker so can go to the command line inside the container.

If successful, this will open a connection to the PostgreSQL database via Django. You can run SQL queries here to confirm the tables were created.


Using pgAdmin for the postgresql ui
pgAdmin:

This is the most popular and feature-rich open-source administration and development platform for PostgreSQL.
It can be run as a separate Docker container, making it easy to connect to your PostgreSQL container.
1) I can set up a docker-compose:

```yaml
version: '3'
   services:
     postgres:
       image: postgres:latest
       environment:
         POSTGRES_PASSWORD: yourpassword
       ports:
         - "5432:5432"

     pgadmin:
       image: dpage/pgadmin4
       environment:
         PGADMIN_DEFAULT_EMAIL: user@domain.com
         PGADMIN_DEFAULT_PASSWORD: pgadminpassword
       ports:
         - "80:80"
       depends_on:
         - postgres

```

OR

2) Just run a single command and start the container using docker desktop:
docker run --name pgadmin4 -e PGADMIN_DEFAULT_EMAIL=hope-dev@outlook.com -e PGADMIN_DEFAULT_PASSWORD=p@ssw0rd -p 8080:80 -d dpage/pgadmin4

update for both postgres and pgadmin - add network flag
docker run --network local-network --name patient-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=p@ssw0rd -e POSTGRES_DB=patients -p 5432:5432 -d postgres
docker run --network local-network --name pgadmin4 -e PGADMIN_DEFAULT_EMAIL=hope-dev@outlook.com -e PGADMIN_DEFAULT_PASSWORD=p@ssw0rd -p 8080:80 -d dpage/pgadmin4