from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework_simplejwt.tokens import RefreshToken
from .models import *


class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'isAdmin']

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)



class VariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variant
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    variants = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Question
        fields = '__all__'

    def get_variants(self, obj):
        variants = obj.variant_set.all()
        serializer = VariantSerializer(variants, many=True)
        return serializer.data


class TestSerializer(serializers.ModelSerializer):    
    questions = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Test
        fields = '__all__'

    def get_questions(self, obj):
        questions = obj.question_set.all()
        serializer = QuestionSerializer(questions, many=True)
        return serializer.data    


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'


class SimpleTestSerializer(TestSerializer):
    class Meta:
        model = Test
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    store = serializers.SerializerMethodField(read_only=True)
    position = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'

    def get_store(self, obj):
        store = obj.store
        serializer = StoreSerializer(store, many=False)
        return serializer.data

    def get_position(self, obj):
        position = obj.position
        serializer = PositionSerializer(position, many=False)
        return serializer.data
    

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'


class ResultSerializer(serializers.ModelSerializer):
    answers = serializers.SerializerMethodField(read_only=True)
    test_desc = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Result
        fields = '__all__'

    def get_answers(self, obj):
        answers = obj.answer_set.all()
        serializer = AnswerSerializer(answers, many=True)
        return serializer.data
    
    def get_test_desc(self, obj):
        test_desc = obj.test
        serializer = TestSerializer(test_desc, many=False)
        return serializer.data
    

class ProfileResultsSerializer(serializers.ModelSerializer):
    results = serializers.SerializerMethodField(read_only=True)
    position = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'

    def get_results(self, obj):
        results = obj.user_id.result_set.all()
        serializer = ResultSerializer(results, many=True)
        return serializer.data

    def get_position(self, obj):
        position = obj.position
        serializer = PositionSerializer(position, many=False)
        return serializer.data


class SimpleTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'


class PositionWithTestsSerializer(serializers.ModelSerializer):
    tests = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Position
        fields = '__all__'

    def get_tests(self, obj):
        tests = obj.test_set.all()
        serializer = SimpleTestSerializer(tests, many=True)
        return serializer.data


class StoreInfoSerializer(StoreSerializer):    
    users = serializers.SerializerMethodField(read_only=True)
    positions = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Store
        fields = '__all__'

    def get_users(self, obj):
        users = obj.profile_set.all()
        serializer = ProfileResultsSerializer(users, many=True)
        return serializer.data
    
    def get_positions(self,obj):
        positions = Position.objects.all()
        serializer = PositionWithTestsSerializer(positions, many=True)
        return serializer.data