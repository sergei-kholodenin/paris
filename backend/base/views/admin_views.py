from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password

from base.models import *
from base.serializers import *


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getStoresInfo(request):
    stores = Store.objects.all()
    serializer = StoreInfoSerializer(stores, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateStoreName(request):
    data = request.data
    store = Store.objects.get(id=data['id'])
    store.name = data['store']
    store.save()
    return Response("Название обновлено.")


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteStore(request, pk):
    store = Store.objects.get(id=pk)
    store.delete()
    return Response("Магазин удален.")


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserResults(request, pk):
    user = User.objects.get(id=pk)
    result = Result.objects.filter(user=user).order_by('-createdAt')
    serializer = ResultSerializer(result, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserResultsById(request, pk):
    result = Result.objects.filter(id=pk)
    serializer = ResultSerializer(result, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createStore(request):
    data = request.data
    Store.objects.create(
        name = data['name']
    )
    return Response("Магазин успешно создан.")


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updatePositionName(request):
    data = request.data
    position = Position.objects.get(id=data['id'])
    position.name = data['position']
    position.save()
    return Response("Название обновлено.")


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deletePosition(request, pk):
    position = Position.objects.get(id=pk)
    position.delete()
    return Response("Должность удалена.")


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createPosition(request):
    data = request.data
    Position.objects.create(
        name = data['name']
    )
    return Response("Должность успешно создана.")


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getPositionsInfo(request):
    positions = Position.objects.all()
    serializer = PositionSerializer(positions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getTestsInfo(request):
    tests = Test.objects.all()
    serializer = SimpleTestSerializer(tests, many=True)
    return Response(serializer.data)




@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateTest(request):
    data = request.data
    test = Test.objects.get(id=data['id'])
    position = Position.objects.get(id=data['position'])
    test.test = data['test']
    test.position = position
    test.entry_questions = data['entryQ']
    test.entry_percent = data['entryP']
    test.save()
    return Response("Данные теста обновлены.")


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteTest(request, pk):
    test = Test.objects.get(id=pk)
    test.delete()
    return Response("Тест удален.")


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createTest(request):
    data = request.data
    Test.objects.create(
        test = data['test']
    )
    return Response("Тест успешно создан.")


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getQuestions(request, pk):
    test = Test.objects.get(id=pk)
    questions = Question.objects.filter(test_id=test)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteVariant(request, pk):
    variant = Variant.objects.get(id=pk)
    variant.delete()
    return Response('Вариант удален.')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateQuestion(request):
    data = request.data
    question = Question.objects.get(id=data['id'])
    for var in data['variants']:
        try:
            variant = Variant.objects.get(id=var['id'])
            variant.variant = var['variant']
            variant.is_right = var['is_right']
            variant.save()
        except:
            Variant.objects.create(
                variant = var['variant'],
                is_right = var['is_right'],
                question_id=question
            )
    question.question = data['question']
    question.save()

    return Response("Данные обновлены.")


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteQuestion(request, pk):
    question = Question.objects.get(id=pk)
    question.delete()
    return Response("Вопрос удален.")


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createQuestion(request):
    data = request.data
    test = Test.objects.get(id=data['test_id'])
    Question.objects.create(
        question = data['question'],
        test_id = test
    )
    return Response("Вопрос успешно создан.")


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createQuestions(request):
    data = request.data
    for quest in data:
        test = Test.objects.get(id=quest['testId'])
        question = Question.objects.create(
            test_id = test,
            question = quest['question']
        )
        for i in quest['variants']:
            Variant.objects.create(
                question_id = question,
                variant = i['variant'],
                is_right = i['isRight']
            )
    return Response("Вопросы успешно созданы.")


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsersList(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createUser(request):
    data = request.data
    User.objects.create(
        username = data['email'],
        email = data['email'],
        password = make_password(data['password'])
    )
    return Response("Пользователь успешно создан.")


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    user = User.objects.get(id=pk)
    user.delete()
    return Response("Пользователь успешно удален.")


@api_view(['POST'])
@permission_classes([IsAdminUser])
def updateAdmin(request):
    data = request.data
    user = User.objects.get(id=data['id'])
    user.is_staff = data['isAdmin']
    user.save()
    return Response("Статус успешно обновлен.")


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getProfile(request, pk):
    user = User.objects.get(id=pk)
    try:
        profile = Profile.objects.get(user_id=user)
        serializer = ProfileSerializer(profile, many=False)
        return Response({"profile":serializer.data, "profileExist":True})
    except:        
        serializer = UserSerializer(user, many=False)
        return Response({"profile":serializer.data, "profileExist":False })
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createUserProfile(request):
    data = request.data
    user = User.objects.get(id=data['userId'])

    if data['store']:
        store = Store.objects.get(id=data['store']['id'])
    else:
        store = None

    if data['position']:
        position = Position.objects.get(id=data['position']['id'])
    else:
        position = None
    
    Profile.objects.create(
        user_id = user,
        first_name = data['first_name'],
        second_name = data['second_name'],
        last_name = data['last_name'],
        email = data['email'],
        store = store,
        position = position,
        telephone = data['telephone']
    )
    
    if data['password'] != '':
        user.password = make_password(data['password'])
    user.email = data['email']
    user.save()
    return Response("Профайл успешно создан.")


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    data = request.data    
    user = User.objects.get(id=data['userId'])
    
    profile = Profile.objects.get(id=data['profileId'])

    if data['store']:
        store = Store.objects.get(id=data['store']['id'])
    else:
        store = None   

    if data['position']:
        position = Position.objects.get(id=data['position']['id'])
    else:
        position = None 
    
    profile.first_name = data['first_name']
    profile.second_name = data['second_name']
    profile.last_name = data['last_name']
    profile.email = data['email']
    profile.store = store
    profile.position = position
    profile.telephone = data['telephone']

    
    if data['password'] != '':
        user.password = make_password(data['password'])
    user.email = data['email']

    profile.save()
    user.save()
    
    return Response("Профайл успешно обновлен")


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getListProfiles(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateStorePos(request):
    data = request.data
    profile = Profile.objects.get(id=data['id'])
    if data['store']:
        store = Store.objects.get(id=data['store'])
    else:
        store = None 
    if data['position']:
        position = Position.objects.get(id=data['position'])
    else:
        position = None
    profile.store = store
    profile.position = position
    profile.save()
    return Response('Успешно обновлено')