/**
 * Container Generator
 */

const componentExists = require('../helpers/componentExists');
const CONTAINERS_PATH = '../../app/containers';

module.exports = {
	description: 'Add a container component',
	prompts: [
		{
			type: 'input',
			name: 'name',
			message: 'What should it be called?',
			default: 'Form',
			validate: (value) => {
				if (/.+/.test(value)) {
					return componentExists(value)
						? 'A component or container with this name already exists'
						: true;
				}

				return 'The name is required';
			},
			filter: (value) => value.trim(),
		},
		{
			type: 'list',
			name: 'security',
			default: 'public',
			choices: ['public', 'secured'],
			message: 'What kind of permission should your container have?',
		},
		{
			type: 'confirm',
			name: 'memo',
			default: true,
			message: 'Do you want to wrap your component in React.memo?',
		},
		{
			type: 'confirm',
			name: 'wantHeaders',
			default: true,
			message: 'Do you want React Helmet headers?',
		},
		{
			type: 'confirm',
			name: 'wantMessages',
			default: true,
			message: 'Do you want i18n messages (i.e. will this component use text)?',
		},
		{
			type: 'confirm',
			name: 'wantLoadable',
			default: true,
			message: 'Do you want to load resources asynchronously?',
		},
	],
	actions: (data) => {
		// Generate index.js and index.test.js
		const actions = [
			{
				type: 'add',
				path: CONTAINERS_PATH + '/' + data.security + '/{{properCase name}}/index.js',
				templateFile: './containerGenerator/index.js.hbs',
				abortOnFail: true,
			},
			{
				type: 'add',
				path: CONTAINERS_PATH + '/' + data.security + '/{{properCase name}}/tests/index.test.js',
				templateFile: './containerGenerator/test.js.hbs',
				abortOnFail: true,
			},
		];

		// If component wants messages
		if (data.wantMessages) {
			actions.push({
				type: 'add',
				path: CONTAINERS_PATH + '/' + data.security + '/{{properCase name}}/messages.js',
				templateFile: './containerGenerator/messages.js.hbs',
				abortOnFail: true,
			});
		}

		if (data.wantLoadable) {
			actions.push({
				type: 'add',
				path: CONTAINERS_PATH + '/' + data.security + '/{{properCase name}}/Loadable.js',
				templateFile: './containerGenerator/Loadable.js.hbs',
				abortOnFail: true,
			});
		}

		return actions;
	},
};
