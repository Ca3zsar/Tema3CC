from asyncio.windows_events import NULL
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
import psycopg2

from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

@csrf_exempt
def tweet(request):
    if request.method == 'POST':
        url = request.POST.get("url","")
        if url == "":
            return HttpResponse("URL empty", status=400)

        response_data = {}
        response_data["message"] = f"Your url is {url}"
        return HttpResponse(json.dumps(response_data),content_type="application/json")
    else:
        return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def register(request):
    conn = None
    try:
        conn = psycopg2.connect(
            host="34.116.175.179",
            database="twitter",
            user="admin",
            password="admin")
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
            if conn is not None:
                conn.close()
                print('Database connection closed.')

    if request.method == 'POST':
        username = request.POST.get("username","")
        password = request.POST.get("password","")
        email    = request.POST.get("email","")


        if username == "" or password == "" or email == "":
            return HttpResponse("Fields username, password and email must exist!", status=400)

        response_data = {}
        response_data["message"] = f"{username} - {password} - {email}"
        return HttpResponse(json.dumps(response_data),content_type="application/json")
    else:
        return HttpResponse("Method not allowed", status=405)
