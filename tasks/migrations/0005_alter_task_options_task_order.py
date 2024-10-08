# Generated by Django 5.1 on 2024-08-18 02:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tasks", "0004_alter_task_deadline"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="task",
            options={"ordering": ["order"]},
        ),
        migrations.AddField(
            model_name="task",
            name="order",
            field=models.PositiveIntegerField(default=1),
        ),
    ]
