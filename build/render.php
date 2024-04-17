<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>

<div class="masonry-grid gutterSpacing">
    <div class="masonry">
        <?php
        $index = 1;
        $row = 1;
        shuffle($attributes['images']);
        $images = array_slice($attributes['images'], 0, 19);


        foreach ($images as $image) {
            $index++;
            $className = 'grid-item';

            if ($row % 2 != 0) {
                if ($index == 1 || $index == 3 || $index == 5) {
                    $className = 'grid-item tall';
                    $index++;
                }
            } else {
                if ($index == 2 || $index == 4 || $index == 6) {
                    $className = 'grid-item tall';
                    $index++;
                }
            }
            if ($index == 6) {
                $index = 0;
                $row++;
            }

            echo '
       <div class="' . $className . '">
       <img src="' . wp_get_attachment_image_url($image['id'], "full") . '"
        srcset="' . wp_get_attachment_image_srcset($image['id'], 'full') . '"
        sizes="' . wp_get_attachment_image_sizes($image['id'], 'full') . ' ">
        </div>';
        }
        ?>
    </div>
</div>