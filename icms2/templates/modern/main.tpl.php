<!DOCTYPE html>
<html lang="<?php echo cmsCore::getLanguageName(); ?>" class="h-100">
    <head>
        <title><?php $this->title(); ?></title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="csrf-token" content="<?php echo cmsForm::getCSRFToken(); ?>" />
        <meta name="generator" content="InstantCMS" />
        <?php $this->addMainTplCSSName([
            'theme'
        ]); ?>
        <?php if(!empty($this->options['font_type']) && $this->options['font_type'] == 'gfont') {
            $this->addHead('<link rel="preconnect" href="https://fonts.gstatic.com">');
            $this->addCSS('https://fonts.googleapis.com/css?family='.$this->options['gfont'].':400,400i,700,700i&display=swap&subset=cyrillic-ext', false);
        } ?>
        <?php $this->addMainTplJSName('jquery', true); ?>
        <?php $this->addMainTplJSName('vendors/popper.js/js/popper.min'); ?>
        <?php $this->addMainTplJSName('vendors/bootstrap/bootstrap.min'); ?>
        <?php $this->onDemandTplJSName([
            'vendors/photoswipe/photoswipe.min'
        ]); ?>
        <?php $this->onDemandTplCSSName([
            'photoswipe'
        ]); ?>
        <?php $this->addMainTplJSName('core'); ?>
        <?php $this->addMainTplJSName('modal'); ?>
        <?php $this->addMainTplCSSName([
            'styles'
        ]); ?>
        <?php $this->head(true, false, true); ?>
        <link rel="shortcut icon" href="<?php echo $this->getTemplateFilePath('images/favicons/vector.ico'); ?>">
        <!--<link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />-->
    </head>
    <body id="<?php echo $device_type; ?>_device_type" data-device="<?php echo $device_type; ?>" class="d-flex flex-column h-100 main_container">
      
        <?php $this->renderLayoutChild('scheme', ['rows' => $rows]); ?>
        <?php if (!empty($this->options['show_top_btn'])){ ?>
            <a class="btn btn-secondary btn-lg" href="#<?php echo $device_type; ?>_device_type" id="scroll-top">
                <?php html_svg_icon('solid', 'chevron-up'); ?>
            </a>
        <?php } ?>
        <?php if (!empty($this->options['show_cookiealert'])){ ?>
            <div class="alert text-center py-3 border-0 rounded-0 m-0 position-fixed fixed-bottom icms-cookiealert" id="icms-cookiealert">
                <div class="container">
                    <?php echo $this->options['cookiealert_text']; ?>
                    <button type="button" class="ml-2 btn btn-primary btn-sm acceptcookies">
                        <?php echo LANG_MODERN_THEME_COOKIEALERT_AGREE; ?>
                    </button>
                </div>
            </div>
        <?php } ?>
        <script><?php echo $this->getLangJS('LANG_LOADING', 'LANG_ALL'); ?></script>
        <?php $this->printJavascriptTags(); ?>
        <?php $this->bottom(); ?>
        <?php $this->onDemandPrint(); ?>
        <?php if ($config->debug && cmsUser::isAdmin()){ ?>
            <?php $this->renderAsset('ui/debug', ['core' => $core]); ?>
        <?php } ?>
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    </body>
</html>