<<<<<<< HEAD
#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "study_api.settings")

    from django.core.management import execute_from_command_line

=======
#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "study_api.settings")

    from django.core.management import execute_from_command_line

>>>>>>> 6db5b69cab8c264b937baaa36976fd5ad75a9c2b
    execute_from_command_line(sys.argv)