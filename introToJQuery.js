// BASIC CSS SELECTORS

// The most basic CSS selector is to simply use the name of the element you're looking for. Want all h1 elements? Simply use h1 as your selector.


// $('h1') // selects all h1 elements
// You will notice, just as we saw with document.ready, we pass the appropriate text into the jQuery constructor to indicate the selector we wish to use. 
// Because of the flexibility of JavaScript, and how jQuery was designed, this patter stays rather consistent whenever you're looking to get started 
// using jQuery in a page - simply pass the appropriate text, item, or other component, into the constructor, and jQuery will handle it from there.

// Bringing it back to CSS selectors, let's take a look at using classes. If you need to find all items that use a particular class, 
// you can simply use the name of the class with a dot in front of it, just as you would if you were creating a CSS stylesheet.


$('.class-name') // selects all elements with a class of class-name
// And finally, if you wish to find an item by its ID, you use the same CSS syntax, prepending the ID name with a hash.


$('#demo') // selects all elements with an id of demo

// ATTRIBUTE BASED SELECTORS

// The HTML specification defines many attributes, such as class and style as well as allowing developers to add their own attributes. 
// By using CSS selector syntax, you can locate items based on both custom and predefined attributes.
// To find elements in which an attribute is set to a specific value, you use the equality syntax. Note that the value you wish to compare must be in quotes, 
// which means you need to use both single and double quotes to create the appropriate string. While the actual quotes you use are up to you, I ,and 
// most JavaScript developers I've worked with, use single quotes for normal strings in JavaScript, and then use double quotes when we need to indicate 
// a quoted value inside of a string.


// selects **all** elements with an attribute matching the specified value
$('[demo-attribute="demo-value"]') 

// selects all **h1** elements with an attribute matching the specified value
$('h1[demo-attribute="demo-value"]')
// Locating items by partial attribute values

// Many frameworks, such as Bootstrap, make their magic happen by having developers add certain classes or other attributes to their HTML. 
// Often, the values you'll use for classes or attributes have consistent patterns or prefixes. jQuery allows you to select items by searching 
// inside of attribute values for desired sub-strings.

// If you wish to find all elements where the value starts with a string, use the ^= operator.


$('[class^="col"]')
// If you wish to find all elements where the value contains a string, use the *= operator.


$('[class*="md"]')

// POSITIONAL SELECTORS

// Oftentimes you need to located elements based on where they are on the page, or in relation to other elements in the DOM. 
// For example, an a element inside of a nav section may need to be treated differently than a elements elsewhere on the page. 
// CSS, and in turn jQuery, offer the ability to find items based on their location.

// Parent/child relationships

// The simplest location selector is one for parent/child. The > between selectors indicates the parent/child relationship. 
// With this relationship, the second item listed must be a direct child of the first item, with no other elements between the two.

// Consider the following script:


// Selects all a elements that are direct descendants nav element
$('nav > a')
// In the following HTML, the first link would be selected, but not the second. 
// This is because the first link is a direct child, but the second is inside of a div element.


<nav>
	<a href="#">(First) This will be selected</a>
	<div>
		<a href="#">(Second) This will **not** be selected</a>
	</div>
</nav>
// Descendants

// To select elements where the targeted element is a descendant of another element, 
// regardless of how many levels exist between the two, 
// simply put a space between the two selectors.


// Selects all a elements that are descendants nav element
// The elements can appear anywhere inside of the element listed first
$('nav a')

// While the difference in syntax is subtle, it makes a big difference in regards to the items selected. 
// Using the same HTML from above, both a elements would be selected by using the syntax $('nav a).


<nav>
	<a href="#">(First) This will be selected</a>
	<div>
		<a href="#">(Second) This will be selected</a>
	</div>
</nav>

// NAVIGATING THE DOM WITH JQUERY

// CSS offers quite a bit of power when it comes to selecting items. However, there are a couple of limitations. 
// First, CSS selectors aren't dynamic; if new items are added later those new items aren't part of the selection. 
// Second, there are times when it's just easier to express the items you want programatically rather than using CSS. 
// Fortunately, jQuery allows us to select items by using code as well.

// Navigating parent / child relationships

// jQuery offers two methods that allow you to locate children or descendents of the currently selected element.
// The first is children, which will allow you to select, or search through, all direct descendents of the currently selected item. 
// Keep in mind that children will only work with direct children of the current element; anything further down the hierarchy will 
// not be considered when using children.

// children also accepts an optional CSS selector. This allows you to filter children using the same syntax we covered earlier. 
// Consider a nav element with multiple a elements as children. You may want to select all a elements 
// that have an href attribute starting with http://, which would indicate the link refers to an external site. 
// You could select just those a elements by using the following syntax:


// currentElement.children('a[href^="http://"]');
// As mentioned earlier, children only applies to direct descendents. If you need to look throughout the entire hierarchy below 
// the currently selected element, you use the find method. find works just like children, with the only difference being 
// that find will look beyond direct children of the current element. Just like children, find also accepts a selector for filtering.

// Consider the following HTML.


<nav id="navigation">
    <ul>
        <li><a href="http://www.microsoft.com">Microsoft</a></li>
        <li><a href="http://www.adventure-works.com">AdventureWorks</a></li>
        <li><a href="register">Register</a></li>
    </ul>
</nav>
// If we needed to select all a elements under the nav element we couldn't use children. 
// This is where find comes into play. And, just like before, if we only wanted the a elements 
// that had an href that started with http://, we could add in the CSS selector to filter.


// select the nav element by its ID
var navigation = $('#navigation');

// select all a elements with an href that starts with http://
navigation.find('a[href^="http://"]')

// SIBLINGS

// Many sections of an HTML page have a consistent structure. 
// For example, most forms will have a label, followed by an input element, followed by a placeholder for an error message.


<div>
    <label for="name">Name:</label>
    <input type="text" id="name" />
    <div id="name-error"></div>
</div>

// Imagine a bit of jQuery code where you had a reference to the input element, and you were performing a bit of validation. 
// You would want to display any error message in the div element immediately following the input tag. 
// While you could explicitly get a reference to the div element by its ID, that code wouldn't be reusable.

// If your site maintained that structure of label, input, div, you could create generic event handlers, 
// and update the error message simply by using that consistent structure to your advantage.

// prev and next

// Image a bit of jQuery code to grab the input element.


// var currentInput = $('name');
// To move to the prior element, jQuery provides the prev method. You can use prev() to access the prior 
// element in the hierarchy (the label in the example). If you wanted the div element to update the error message, 
// which follows the input element, you would use next()


// text allows you to modify the text in an element
curentInput.next().text('error message');

// As with most methods used to select items in jQuery, both prev and next support CSS selectors.

// prevAll and nextAll

// prev and next only look at the item immediately prior or after, respectively. 
// prevAll and nextAll will select all siblings prior or after the element. 
// Both methods also accept a CSS selector to limit the items.

// Imagine a form with a checkbox, where upon selection you need to enable the two textboxes and labels immediately following it.


<label for="provide-address">Provide address?</label>
<input type="checkbox" id="provide-address" />

<label for="street">Street:</label>
<input type="text" id="street" disabled="true" />

<label for="country">Country:</label>
<input type="text" id="country" disabled="true" />
You could enable the textboxes by using the following jQuery:


// The attr method is used to set (or read) an attribute
// The first parameter is the name of the attribute, the second is the value to set

// Since we only need input elements, we'll use the name of the tag as the filter
$('#provide-address').nextAll('input').attr('disabled', 'true');

// Disabled attribute One interesting note about the disabled attribute is that it's one of the attributes that, 
// according to the HTML specification, does not require a key/value pair. 
// As a result, simply using <input disabled type="text" /> would disable the textbox. 
// However, this wouldn't be valid XML syntax. As a result, I personally prefer to use either disabled="true" or disabled="disabled" to 
// ensure a key/value pair and well-formed XML.
// prevUntil and nextUntil

// Finally, prevUntil and nextUntil select all prior or following elements up to, but not including the element that matches the selector.

// SELECTING ITEMS BY POSITION

// When creating a dynamic UI, you might not know anything else about an item other than its position. 
// jQuery offers you the ability to both locate an item by its position in a collection, or to find out the index location of an item.


// Finding the index of an item

// If you have a reference to an object, but need to know where it sits in a collection of items, you can use the index method. 
// The index method will return the zero based (ordinal) location of the item, or -1 if the item isn't found.


var currentElement = $('some selector');
var parent = $('some selector');
var index = parent.children().index(currentElement);
// Finding an item by its position

// If you know the zero based (ordinal) location of an item in a collection, you can obtain a reference to that item by using the get method.


var parent = $('some selector');
var element = parent.children().get(index);
// get return type

// One important note about get is it returns a JavaScript DOM object, not a jQuery object. This means the various jQuery methods, 
// such as attr and text are not available. In order to call jQuery methods on the object, you must convert it to a jQuery object. 
// Fortunately, this is just as easy as passing the object into the jQuery constructor. The above code would become:


var parent = $('some selector');
var element = parent.children().get(index);
var jQueryObject = $(element);
// Or, you could distill it down to two lines


var parent = $('some selector');
var jQueryObject = $(parent.children().get(index));
// Or, I suppose, down to one line.


var jQueryObject = $($('some selector').children().get(index));
// It's all just a matter of personal preference.




// Adding a class

// Adding a class to an element is just as easy as calling addClass.


currentElement.addClass('class-name');
// Removing a class

// Removing a class from an element is just as easy as calling removeClass. 
// If the element in question was not already decorated with the class you're trying to remove, the method will simply return.


// Retrieving an attribute value

// To retrieve an attribute value, simply use the attr method with one parameter, the name of the attribute you wish to retrieve.


alert($('selector').attr('attribute-name'));
// Modifying an attribute value

// To update an attribute value, use the attr method with two parameters, 
// the first being the name of the attribute and the second the new value you wish to use.


$('selector').attr('attribute-name', 'new value');


// Updating text and HTML

// jQuery offers you the ability to update the text inside of an element by using the text method, and 
// the HTML inside of an element by using the html method. Both methods will replace all of the content of an element.

// The main difference between the two methods is html will update (and parse) the HTML that's passed into the method, 
// while text will be text only. If you pass markup into the text method, it will be HTML encoded, 
// meaning all tags will be converted into the appropriate syntax to just display text, rather than markup.
//  In other words, < will become &lt; and just display as < in the browser. 
//  By using text when you're only expecting text, you can mitigate cross-site scripting attacks.

// Examples


// update the text
$(item).text('Hello, world!!');

// update the HTML
$(item).html('HELLO, WORLD!!');


currentElement.removeClass('class-name');


// Basic event handlers

// Earlier we saw how to register an event handler for document.ready. jQuery allows you to access almost any other event t
// hat is raised via the JavaScript DOM, as well as several others. While a deeper discussion of event handlers will begin in Module 2, 
// let's take a look at a few to get us one step closer to creating real applications using jQuery.

// Registering event handlers

// To register an event handler, you will call the jQuery method that matches the event handler you're looking for. 
// For example, if you wanted the click event, you'd use the click method. Methods for wiring up event handlers allow you to 
// pass either an existing function, or create an anonymous method. Most developers prefer to use an anonymous method, 
// as it makes it easier to keep the namespace clean and not have to name another item.

// Inside of the event handler code, you can access the object that raised the event by using this. One important note about 
// this is it is not a jQuery object but rather a DOM object; you can convert it by using the jQuery constructor as we've seen before: $(this).

// Examples


// click event
// raised when the item is clicked
$(item).click(function() {
    alert('clicked!!');
});

// hover event
// raised when the user moves their mouse over the item
$(item).hover(function() {
    alert('hover!!');
});

// mouseout
// raised when the user moves their mouse away from an item
$(item).mouseout(function() {
    alert('mouse out');
});



