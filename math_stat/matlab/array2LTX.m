% array2LTX(filename, matrix, options)
%
% Produce LaTeX tables or longtables from an m x n matrix, where
% the columns used from the matrix are given in the vector cols.
% 
% filename is the name of the file where the output will be written.
% matrix is the matlab array.
%
% List of options.
% 'cols' is the list of columns of the given matrix that will
%        be used to generate the LaTeX table.  The columns numbers given
%        in cols must be between 1 and n inclusively.  The default is
%        all columns in the regular order.
% 'nbr' is the number of tables that will appear side by side with at must
%       m/nbr lines and at least floor(m/nbr) lines per table.
%       The default is one.
% 'lgTable' is an integer.  If lgTable = 0, the table environment is used.
%           If lgTable <> 0, the longtable environment is used.  The default
%           is lgTable = 0.  Do not forget that LaTeX may have to be run
%           several times to produce the correct longtable.
% 'caption' is the caption of the table.
% 'label' is the label that should be given to the table or longtable.
%         There should be a caption to have a label.
% 'format' is the format of the numbers to be printed.  The default is
%          $%.8f$.  Do not forget the symbol $ for the math mode in LaTeX.
%          The format is the normal format used for fprintf in C.
% 'firsthead' is the list of headers for each column of the table.
%             It should be of the form ["head1","head2",...,"headk"]
%             where k = length(cols).  The quotation marks cannot be
%             replaced by apostropies.  If k <> length(cols), the columns
%             do not get any headers
% 'secondhead' is the list of headers for each column of the 
%              second table in a longtable environment.
%              If secondhead is empty or length(secondhead) <> length(cols),
%              the content of firsthead is used for the second table.
%
function array2LTX(filename, matrix, varargin)
    if ( nargin < 2 )
        disp("No enough arguments.  Use help arrayToLaTeX.");
        return;
    end

    % Default values
    cols = 1:size(matrix,2);
    nbr = 1;
    lgTable = 0;
    caption = '';
    label = '';
    format = "$%.8f$";
    N1heads = 0;
    firsthead = '';
    secondhead = '';

    while ( ~isempty(varargin) )
        switch lower(varargin{1})
          case 'cols'
            cols = varargin{2};
          case 'nbr' 
            nbr = varargin{2};
          case 'lgtable'
            lgTable = varargin{2};
          case 'caption'
            caption = varargin{2};
          case 'label'
            label = varargin{2};
          case 'format'
            format = varargin{2};
          case 'label'
            label = varargin{2};
          case 'firsthead'
            firsthead = varargin{2};
            N1heads = length(firsthead);
          case 'secondhead'
            secondhead = varargin{2};
          otherwise
            disp(varargin{1}+" is an unknown options.");
        end
        varargin = varargin(3:length(varargin));
    end

    lth = size(matrix,1);
    Nrow = ceil(lth/nbr);
    Frow = floor(lth/nbr);
    Ncol = length(cols);
    Fcol = rem(lth,nbr);

    if ( length(firsthead) ~= length(secondhead) )
        secondhead = firsthead;
    end

    % Open the file for writing
    fid = fopen(filename,'w');
    
    if ( lgTable ~= 0 )
        fprintf(fid, '\\begin{center}\n');
        fprintf(fid, '\\setlongtables\n');
        fprintf(fid, '\\begin{longtable}{|');
    else
        fprintf(fid, '\\begin{table}\n');
        if ( length(caption) > 0 )
            fprintf(fid, '\\caption{%s}\n', caption);
        end
        if ( length(label) > 0 )
            fprintf(fid, '\\label{%s}\n', label);
        end
        fprintf(fid, '\\begin{center}\n');
        fprintf(fid, '\\begin{tabular}{|');
    end

    for i=1:1:((Ncol+1)*nbr-1)
        fprintf(fid, 'c|');
    end
    fprintf(fid, '}\n');

    if ( lgTable ~= 0 )
        if ( length(caption) > 0 )
            fprintf(fid, '\\caption{%s}', caption);
            if ( length(label) > 0 )
                fprintf(fid, '\\label{%s}', label);
            end
            fprintf(fid, '\\\\ \n');
        end
    end

    for i=1:1:nbr
        fprintf(fid, '\\cline{%d-%d}', (i-1)*(Ncol+1)+1, i*(Ncol+1)-1);
    end
    fprintf(fid, '\n');

    if ( Ncol == N1heads )
        for ( j=1:1:(nbr-1) )
            for k=1:1:Ncol
                fprintf(fid, '%s & ', firsthead(k));
            end
            fprintf(fid, ' & ');
        end
        for k=1:1:(Ncol-1)
            fprintf(fid, '%s & ', firsthead(k));
        end
        fprintf(fid, '%s \\\\ \n', firsthead(Ncol));

        for i=1:1:nbr
            fprintf(fid, '\\cline{%d-%d}', (i-1)*(Ncol+1)+1, i*(Ncol+1)-1);
        end
        fprintf(fid, '\n');
    end
    
    if ( lgTable ~= 0 )
        fprintf(fid, '\\endfirsthead\n');
        fprintf(fid, '\\multicolumn{%d}{l}{\\small Continued from previous page.} \\\\ \n',(Ncol+1)*nbr-1);
        for i=1:1:nbr
            fprintf(fid, '\\cline{%d-%d} ', (i-1)*(Ncol+1)+1, i*(Ncol+1)-1);
        end
        fprintf(fid, '\n');

        if ( Ncol == N1heads )
            for j=1:1:(nbr-1)
                for k=1:1:Ncol
                    fprintf(fid, '%s & ', secondhead(k));
                end
                fprintf(fid, ' & ');
            end
            for k=1:1:(Ncol-1)
                fprintf(fid, '%s & ', secondhead(k));
            end
            fprintf(fid, '%s \\\\ \n', secondhead(Ncol));
            for i=1:1:nbr
                fprintf(fid, '\\cline{%d-%d} ', (i-1)*(Ncol+1)+1, i*(Ncol+1)-1);
            end
            fprintf(fid, '\n');
        end

        fprintf(fid, '\\endhead\n');

        for i=1:1:nbr
            fprintf(fid, '\\cline{%d-%d}', (i-1)*(Ncol+1)+1, i*(Ncol+1)-1);
        end
        fprintf(fid, '\n');
        fprintf(fid, '\\multicolumn{%d}{r}{\\small Continued on next page.} \\\\ \n',(Ncol+1)*nbr-1);
        fprintf(fid, '\\endfoot\n');

        for i=1:1:nbr
            fprintf(fid, '\\cline{%d-%d}', (i-1)*(Ncol+1)+1, i*(Ncol+1)-1);
        end
        fprintf(fid, '\n');
        fprintf(fid, '\\endlastfoot\n');
    end

    for i=1:1:Nrow-1
        for j=1:1:nbr
            if j == 1
                N = i;
            elseif j>1 && j<(Fcol+2)
                N = N + Nrow;
            else
                N = N + Frow;
            end
            for k=1:1:(Ncol-1)
                fprintf(fid, [format,' & '], matrix(N,cols(k)));
            end
            fprintf(fid, format, matrix(N,cols(Ncol)));
            if ( j < nbr )
                fprintf(fid, ' & & ');
            end
        end
        fprintf(fid, ' \\\\ \n');
    end

    for j=1:1:nbr
        if ( Fcol<1 || j <= Fcol )
            N = j*Nrow;
            for k=1:1:(Ncol-1)
                fprintf(fid, [format,' & '], matrix(N,cols(k)));
            end
            fprintf(fid, format, matrix(N,cols(Ncol)));
        else
            for k=1:1:(Ncol-1)
                fprintf(fid, ' & ');
            end
        end
        if ( j < nbr )
            fprintf(fid, ' & & ');
        end
    end
    fprintf(fid, ' \\\\ \n');

    if ( lgTable ~= 0 )
        fprintf(fid, '\\end{longtable}\n');
        fprintf(fid, '\\end{center}\n');
    else
        for i=1:1:nbr
            fprintf(fid, '\\cline{%d-%d}', (i-1)*(Ncol+1)+1, i*(Ncol+1)-1);
        end
        fprintf(fid, '\n');
        fprintf(fid, '\\end{tabular}\n');
        fprintf(fid, '\\end{center}\n');
        fprintf(fid, '\\end{table}\n');
    end

    fclose(fid);
end
