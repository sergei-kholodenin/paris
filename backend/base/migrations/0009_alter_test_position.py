# Generated by Django 4.2.1 on 2023-05-15 16:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0008_alter_test_position"),
    ]

    operations = [
        migrations.AlterField(
            model_name="test",
            name="position",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="base.position",
            ),
        ),
    ]
