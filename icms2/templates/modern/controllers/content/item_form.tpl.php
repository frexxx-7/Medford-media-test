<?php
    $this->addTplJSName('content');

    $this->setPageTitle($page_title);

    if(!$this->isBreadcrumbs()){
        if ($ctype['options']['list_on'] && !$parent){
            $this->addBreadcrumb($ctype['title'], href_to($ctype['name']));
        }
    }

    $this->addBreadcrumb($page_title);

    if(!empty($show_save_button) || !isset($show_save_button)){
        $this->addToolButton([
            'class' => 'save',
            'icon'  => 'save',
            'title' => $button_save_text,
            'href'  => 'javascript:icms.forms.submit()'
        ]);
    }

    if(!$hide_draft_btn){
        $this->addToolButton([
            'class' => 'save_draft',
            'icon'  => 'bookmark',
            'title' => $button_draft_text,
            'href'  => "javascript:icms.forms.submit('.button.to_draft')"
        ]);
    }

    if ($cancel_url){
        $this->addToolButton([
            'class' => 'cancel',
            'icon'  => 'window-close',
            'title' => LANG_CANCEL,
            'href'  => $cancel_url
        ]);
    }

?>

<h1><?php echo html($page_title) ?></h1>

<?php if ($is_premoderation && !$is_moderator) { ?>
    <div class="alert alert-info content_moderation_notice">
        <?php echo LANG_MODERATION_NOTICE; ?>
    </div>
<?php } ?>

<?php
    $this->renderForm($form, $item, [
        'action' => '',
        'submit' => ['title' => $button_save_text, 'show' => (isset($show_save_button) ? $show_save_button : true)],
        'cancel' => ['show' => (bool)$cancel_url, 'href' => $cancel_url],
        'buttons' => $hide_draft_btn ? [] : [
            [
                'title' => $button_draft_text,
                'name' => 'to_draft',
                'attributes' => [
                    'type' => 'submit',
                    'class' => 'to_draft'
                ]
            ]
        ],
        'method' => 'post',
        'toolbar' => false,
        'hook' => [
            'event' => "content_{$ctype['name']}_form_html",
            'param' => [
                'do' => $do,
                'id' => $do == 'edit' ? $item['id'] : null
            ]
        ]
    ], $errors);
?>

<?php ob_start(); ?>
<script>
$(function(){
    icms.content.initMultiCats();
    <?php if ($props){ ?>
        icms.content.initProps('<?php echo href_to($ctype['name'], 'props'); ?>'<?php if($do=='edit'){ ?>, <?php echo $item['id']; ?><?php } ?>);
        <?php if ($is_load_props){ ?>
            icms.content.loadProps();
        <?php } ?>
    <?php } ?>
});
</script>
<?php $this->addBottom(ob_get_clean()); ?>