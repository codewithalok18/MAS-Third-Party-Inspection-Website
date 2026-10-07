from django.db import migrations


def seed_industries(apps, schema_editor):
    Industry = apps.get_model("industries", "Industry")

    industries = [
        {
            "title": "Oil & Gas",
            "slug": "oil-gas",
            "short_description": "Inspection and quality support for oil and gas projects and equipment.",
            "description": "MAS provides inspection, quality, and technical support for oil and gas project activities.",
            "icon": "Fuel",
            "featured": True,
            "published": True,
            "display_order": 1,
        },
        {
            "title": "Renewable Energy",
            "slug": "renewable-energy",
            "short_description": "Quality and inspection support for renewable energy projects.",
            "description": "MAS supports renewable energy projects through inspection, quality control, and technical services.",
            "icon": "Sun",
            "featured": True,
            "published": True,
            "display_order": 2,
        },
        {
            "title": "Infrastructure",
            "slug": "infrastructure",
            "short_description": "Inspection and quality services for infrastructure and construction projects.",
            "description": "MAS provides inspection and quality support for infrastructure and industrial development projects.",
            "icon": "Building2",
            "featured": True,
            "published": True,
            "display_order": 3,
        },
        {
            "title": "Mining & Minerals",
            "slug": "mining-minerals",
            "short_description": "Inspection and quality support for mining and mineral-related projects.",
            "description": "MAS provides inspection and quality services for equipment, materials, and activities associated with mining and minerals.",
            "icon": "Pickaxe",
            "featured": False,
            "published": True,
            "display_order": 4,
        },
        {
            "title": "Manufacturing",
            "slug": "manufacturing",
            "short_description": "Quality inspection and manufacturing surveillance services.",
            "description": "MAS supports manufacturing activities through inspection, surveillance, quality verification, and documentation.",
            "icon": "Factory",
            "featured": False,
            "published": True,
            "display_order": 5,
        },
        {
            "title": "Industrial Projects",
            "slug": "industrial-projects",
            "short_description": "Inspection and technical support for industrial project execution.",
            "description": "MAS provides inspection, expediting, quality, and technical support across industrial projects.",
            "icon": "Truck",
            "featured": False,
            "published": True,
            "display_order": 6,
        },
    ]

    for data in industries:
        Industry.objects.update_or_create(
            slug=data["slug"],
            defaults=data,
        )


def remove_industries(apps, schema_editor):
    Industry = apps.get_model("industries", "Industry")

    slugs = [
        "oil-gas",
        "renewable-energy",
        "infrastructure",
        "mining-minerals",
        "manufacturing",
        "industrial-projects",
    ]

    Industry.objects.filter(slug__in=slugs).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("industries", "0002_seed_industries"),
    ]

    operations = [
        migrations.RunPython(seed_industries, remove_industries),
    ]