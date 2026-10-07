from django.db import migrations


def seed_services(apps, schema_editor):
    Service = apps.get_model("services", "Service")

    services = [
        {
            "title": "Inspection Services",
            "slug": "inspection-services",
            "short_description": "Independent inspection and verification support for materials, equipment, and manufacturing activities.",
            "description": "MAS provides inspection services to support quality, compliance, and project requirements throughout the manufacturing and supply process.",
            "points": [
                "Material and equipment inspection",
                "Manufacturing surveillance",
                "Inspection documentation",
            ],
            "icon": "SearchCheck",
            "featured": True,
            "published": True,
            "display_order": 1,
        },
        {
            "title": "Quality Assurance",
            "slug": "quality-assurance",
            "short_description": "Quality assurance support focused on processes, documentation, and compliance requirements.",
            "description": "MAS supports quality assurance activities through systematic review, documentation, and quality system monitoring.",
            "points": [
                "Quality planning support",
                "Quality system review",
                "Documentation and compliance",
            ],
            "icon": "ShieldCheck",
            "featured": True,
            "published": True,
            "display_order": 2,
        },
        {
            "title": "Quality Control",
            "slug": "quality-control",
            "short_description": "Quality control and verification support across inspection and testing activities.",
            "description": "MAS provides quality control support to help verify materials, processes, and project deliverables against applicable requirements.",
            "points": [
                "Inspection and test monitoring",
                "Quality verification",
                "Non-conformance follow-up",
            ],
            "icon": "ClipboardCheck",
            "featured": True,
            "published": True,
            "display_order": 3,
        },
        {
            "title": "Expediting",
            "slug": "expediting",
            "short_description": "Supplier and manufacturing progress monitoring to support timely project execution.",
            "description": "MAS provides expediting support through supplier follow-up, manufacturing progress monitoring, and documentation tracking.",
            "points": [
                "Supplier progress monitoring",
                "Manufacturing status reporting",
                "Documentation follow-up",
            ],
            "icon": "Truck",
            "featured": False,
            "published": True,
            "display_order": 4,
        },
        {
            "title": "Technical Services",
            "slug": "technical-services",
            "short_description": "Technical personnel and project support for inspection and quality-related activities.",
            "description": "MAS provides technical support and coordination to help projects manage inspection, engineering, and quality requirements.",
            "points": [
                "Technical personnel",
                "Project support",
                "Engineering coordination",
            ],
            "icon": "Settings2",
            "featured": False,
            "published": True,
            "display_order": 5,
        },
        {
            "title": "Audit & Compliance",
            "slug": "audit-compliance",
            "short_description": "Audit and compliance support for processes, systems, and project documentation.",
            "description": "MAS supports audit and compliance activities through process assessment, documentation review, and compliance verification.",
            "points": [
                "Process assessment",
                "Compliance review",
                "Audit documentation",
            ],
            "icon": "FileCheck2",
            "featured": False,
            "published": True,
            "display_order": 6,
        },
    ]

    for data in services:
        Service.objects.update_or_create(
            slug=data["slug"],
            defaults=data,
        )


def remove_services(apps, schema_editor):
    Service = apps.get_model("services", "Service")

    slugs = [
        "inspection-services",
        "quality-assurance",
        "quality-control",
        "expediting",
        "technical-services",
        "audit-compliance",
    ]

    Service.objects.filter(slug__in=slugs).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("services", "0002_service_points"),
    ]

    operations = [
        migrations.RunPython(seed_services, remove_services),
    ]