	/* Global Variables
	 -----------------------------------------------*/
	 var gg_sheet = 'https://docs.google.com/spreadsheets/d/1xy6BUSqv5vR_x6XWBipKPkElMicVCla46ykswwc3DTU/edit?usp=sharing';

	/* Load data for the interactive
	 -----------------------------------------------*/
	function loadLawsuitInteractive( data, tabletop ) {
	    /*jQuery.ajax({
	        url: 'https://calmatters.org/wp-content/products/interactives/trump-lawsuit-2017/data.json',
	        success: function(data) {
	            buildLawsuitFilters(data);
	            buildLawsuitItems(data);
	        }
	    });*/
	    buildLawsuitFilters(data);
	    buildLawsuitItems(data);
	}

	/* Construct the lawsuit filters
	-----------------------------------------------*/
	function buildLawsuitFilters(data) {
	    var topics = ['Consumer Rights', 'Environment', 'Health Care', 'Immigration', 'LGBTQ', 'Other'],
	        filters = '';

	    // populate topics
	    for (var i = 0; i < topics.length; i++) {
	        filters += '<div class="lawsuit-filter-topic" data-topic="' + topics[i] + '" style="background-color: ' + returnTopicColor(topics[i]) + '">' + topics[i] + '</div>';
	    }
	    var topicFilter = '<div class="lawsuit-filter-topics">' + filters + '</div>';

	    jQuery('#lawsuit-filters').append('<span><strong>Filter by topic:</strong></span><br>' + topicFilter);

	    // set up click event
	    jQuery('#lawsuit-filters').on('click', 'div.lawsuit-filter-topic', function() {
	        var filter = jQuery(this).attr('data-topic');

	        if (jQuery(this).attr('data-active') === 'true') {
	            // hide all not the select filter
	            jQuery('.lawsuit-item').show();

	            // highlight active filter
	            jQuery('#lawsuit-filters .lawsuit-filter-topic').css('border', '0').attr('data-active', 'false');

	            // send ga event
	            ga('send', 'event', 'Trump Lawsuits 2017', 'Filter-Lawsuit', filter);
	        } else {
	            // hide all not the select filter
	            jQuery('.lawsuit-item').show();
	            jQuery('.lawsuit-item[data-topic!="' + filter + '"]').hide();

	            // highlight active filter
	            jQuery('#lawsuit-filters .lawsuit-filter-topic').css('border', '0').attr('data-active', 'false');
	            jQuery(this).css('border', 'solid 2px #211f1f').attr('data-active', 'true');

	            // send ga event
	            ga('send', 'event', 'Trump Lawsuits 2017', 'Filter-Lawsuit', filter);
	        }
	    });
	}

	/* Construct lawsuit elements from data
	-----------------------------------------------*/
	function buildLawsuitItems(data) {
	    var lawsuits = data.length,
	        items = '';

	    for (var i = 0; i < lawsuits; i++) {

	        // append header
	        var nickname = '<div class="lawsuit-nickname"><h2>' + data[i].nickname + '</h2></div>';
	        var topic = '<div class="lawsuit-topic"><p style="color:' + returnTopicColor(data[i].topic) + ';">' + data[i].topic + '</p></div>';
	        var topicMobile = '<div class="lawsuit-topic-mobile"><p style="color:' + returnTopicColor(data[i].topic) + ';">' + data[i].topic + '</p></div>';
	        var proper = '<h4>' + data[i].proper_title + '</h4>';
	        var header = '<div class="lawsuit-header">' + nickname + topic + proper + topicMobile + '</div>';


	        // append meta data
	        var date = '<div class="lawsuit-status">Filed: ' + data[i].date + '</div>';
	        var status = '<div class="lawsuit-status">Status: ' + data[i].status + '</div>';
	        var meta = '<div class="lawsuit-meta" style="border-bottom: solid 4px ' + returnTopicColor(data[i].topic) + ';">' + date + status + '</div>';

	        // append context
	        var link = '';
	        if (data[i].trump_url !== undefined) {
	            link = '<a href="' + data[i].trump_url + '" style="color:' + returnTopicColor(data[i].topic) + ';"> Read more about the lawsuit.</a>'
	        }

	        // append summary
	        var summary = '<div class="lawsuit-summary"><strong>Case Summary:</strong><br>' + data[i].case_summary + link + '</div>';

	        // california role in lawsuit
	        var role = '<div class="lawsuit-role">' + californiaLawsuitRole(data[i].status, data[i].california_role) + '</div>';


	        //var title = '<div class=""></div>';

	        // build the lawsuit
	        var lawsuit = '<div class="lawsuit-item" data-status="' + data[i].status + '" data-topic="' + data[i].topic + '" data-id="' + i + '" style="border: solid 1px ' + returnTopicColor(data[i].topic) + ';">' + header + meta + summary + role + '</div>';

	        items += lawsuit;
	    }
	    jQuery('#lawsuit-container').append(items);
	}

	/* Return color based on topic
	-----------------------------------------------*/
	function returnTopicColor(topic) {
	    var color;
	    switch (topic) {
	        case 'Consumer Rights':
	            color = "#a500ff";
	            break;
	        case 'Environment':
	            color = "#ff005a";
	            break;
	        case 'Health Care':
	            color = "#00b374";
	            break;
	        case 'Immigration':
	            color = "#005aff";
	            break;
	        case 'LGBTQ':
	            color = "#ffa500";
	            break;
	        case 'Other':
	            color = "#674200";
	            break;
	    }
	    return color;
	}

	/* California role in a lawsuit
	-----------------------------------------------*/
	function californiaLawsuitRole(status, role) {
	    switch (role) {
	        case 'Solo':
	            if (status === 'Won' || status === 'Lost') {
	                text = 'California fought this case solo.';
	            } else if (status === 'Pending' || status === 'On Hold') {
	                text = 'California is fighting this case solo.';
	            }
	            return text;
	        case 'Leading':
	            if (status === 'Won' || status === 'Lost') {
	                text = 'California led the lawsuit.';
	            } else if (status === 'Pending' || status === 'On Hold') {
	                text = 'California is leading the lawsuit.';
	            }
	            return text;
	        case 'Joining':
	            if (status === 'Won' || status === 'Lost') {
	                text = 'California joined others in the lawsuit.';
	            } else if (status === 'Pending' || status === 'On Hold') {
	                text = 'California is joining others in the lawsuit.';
	            }
	            return text;
	    }
	}

	function initTabletop(){
		Tabletop.init({ 
	    	key: gg_sheet,
	        callback: loadLawsuitInteractive,
	        simpleSheet: true 
	    });
	}	

	window.onload = function(){
		
	}