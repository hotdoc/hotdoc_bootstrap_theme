template_files = files(
    'base_page.html',
    'brand-logo.html',
    'enum_member.html',
    'extra_head.html',
    'field_detail.html',
    'footer.html',
    'member_list.html',
    'multi_return_value.html',
    'navbar.html',
    'navbar_center.html',
    'navbar_links.html',
    'page_content.html',
    'parameter_detail.html',
    'parameters.html',
    'return_item.html',
    'scripts.html',
    'site_navigation.html',
    'stylesheets.html',
    'subpages.html',
)

foreach template: template_files
    configure_file(
        input: template,
        output: '@PLAINNAME@',
        copy: true,
        install: get_option('install'),
        install_dir: install_dir / 'templates',
    )
endforeach
