ig.module( 
	'plugins.gamecubate.automata.automaton'
)

.requires(
)

.defines(function(){

	CellState = {DEAD: 0, ALIVE: 1};

	Automaton = ig.Class.extend({
		
		cols: 0,
		rows: 0,
		inputData: null,
		data: null,
		
		init: function (cols, rows, data)
		{
			this.inputData = data;
			this.cols = cols;
			this.rows = rows;
			this.reset ();
		},
		
		reset: function ()
		{
			if (this.inputData)
			{
				this.data = this.inputData;
				return;
			}
			else
			{
				this.data = [];
				for (var row=0; row<this.rows; row++)
				{
					this.data[row] = [];
					for (var col=0; col<this.cols; col++)
						this.data[row][col] = CellState.DEAD;
				}
			}
		},

		populate: function (livingRatio, padding)
		{
			var margin = padding | 0;
			
			for (var row=margin; row<this.rows-margin; row++)
			{
				for (var col=margin; col<this.cols-margin; col++)
				{
					if (Math.random() < livingRatio)
						this.data[row][col] = CellState.ALIVE;
				}
			}
		},

		// Helpers
		stateAt: function (col, row)
		{
			if (this.data[row])
				return this.data[row][col];
		},

		neighborsOf: function (col, row)
		{
			var neighbors = [];
			var state;

			// above
			state = this.stateAt (col-1, row-1); if (state != undefined) neighbors[neighbors.length] = state;
			state = this.stateAt (col, row-1); if (state != undefined) neighbors[neighbors.length] = state;
			state = this.stateAt (col+1, row-1); if (state != undefined) neighbors[neighbors.length] = state;

			// left and right of
			state = this.stateAt (col-1, row); if (state != undefined) neighbors[neighbors.length] = state;
			state = this.stateAt (col+1, row); if (state != undefined) neighbors[neighbors.length] = state;

			// below
			state = this.stateAt (col-1, row+1); if (state != undefined) neighbors[neighbors.length] = state;
			state = this.stateAt (col, row+1); if (state != undefined) neighbors[neighbors.length] = state;
			state = this.stateAt (col+1, row+1); if (state != undefined) neighbors[neighbors.length] = state;

			return neighbors;
		},
		
		foundWithState: function (state, states)
		{
			var found = 0;
			for (var i=0; i<states.length; i++)
			{
				var theState = states[i];
				if (theState == state)
				{
					found += 1;
				}
			}
			return found;
		},

		step: function ()
		{
			// Iterate over data, applying its rules

			// Override me
		},
	});
});
