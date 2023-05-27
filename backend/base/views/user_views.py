from django.contrib.auth.models import User
from base.serializers import UserSerializer, UserSerializerWithToken, ProfileSerializer, StoreSerializer
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.models import Profile, Store


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    try:
        profile = Profile.objects.get(user_id=user)
        serializer = ProfileSerializer(profile, many=False)
        return Response({"profile":serializer.data, "profileExist":True})
    except:        
        serializer = UserSerializer(user, many=False)
        return Response({"profile":serializer.data, "profileExist":False })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getStores(request):
    stores = Store.objects.all()

    serializer = StoreSerializer(stores, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def registerUser(request):
    data = request.data
    try:
        User.objects.create(
            username = data['email'],
            email = data['email'],
            password = make_password(data['password'])
        )
        return Response('Пользователь зарегистрирован')
    except:
        return Response({'detail':'Пользователь с такой почтой уже существует!'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProfile(request):
    data = request.data
    user = request.user

    if data['store'] != {}:
        store = Store.objects.get(id=data['store']['id'])
    else:
        store = None
    
    profile =Profile.objects.create(
        user_id = user,
        first_name = data['first_name'],
        second_name = data['second_name'],
        last_name = data['last_name'],
        email = data['email'],
        store = store,
        telephone = data['telephone']
    )
    
    if data['password'] != '':
        user.password = make_password(data['password'])
    user.email = data['email']
    user.save()
    serializer = ProfileSerializer(profile, many=False)
    return Response({"profile":serializer.data, "profileExist":True })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProfile(request):    
    user = request.user
    data = request.data
    profile = Profile.objects.get(id=data['profileId'])

    if data['store'] != {}:
        store = Store.objects.get(id=data['store']['id'])
    else:
        store = None    
    
    profile.first_name = data['first_name']
    profile.second_name = data['second_name']
    profile.last_name = data['last_name']
    profile.email = data['email']
    profile.store = store
    profile.telephone = data['telephone']

    
    if data['password'] != '':
        user.password = make_password(data['password'])
    user.email = data['email']

    profile.save()
    user.save()
    serializer = ProfileSerializer(profile, many=False)
    
    return Response({"profile":serializer.data, "profileExist":True })
    


