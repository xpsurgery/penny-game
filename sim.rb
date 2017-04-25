TICK_SECS = 0.05
GAME_STEPS = 1000
TECH_DEBT_COST = 2

BATCH_SIZE = 4
DEV_BATCH_SIZE = 4
PULL_SYSTEM = false

@ins =        [0, 0, 0, 0, 0]
@outs =       [0, 0, 0, 0]
batch_sizes = [BATCH_SIZE, BATCH_SIZE, DEV_BATCH_SIZE, BATCH_SIZE]


def display_state
  puts "#{@ins[0]} #{@outs[0]}\t#{@ins[1]} #{@outs[1]}\t#{@ins[2]} #{@outs[2]}\t#{@ins[3]} #{@outs[3]}\t#{@ins[4]}"
end

def ready_for_new_batch(worker)
  !PULL_SYSTEM || (worker >= 4 || @ins[worker] == 0)
end

step_size = 1

step = 0
loop do
  # display_state
  if step >= GAME_STEPS
    puts "BATCH_SIZE = #{BATCH_SIZE}"
    puts "DEV_BATCH_SIZE = #{DEV_BATCH_SIZE}"
    puts "PULL_SYSTEM = #{PULL_SYSTEM}"
    display_state
    puts "Value = #{@ins[4]}"
    puts "Total WIP = #{@ins.sum + @outs.sum - @ins[4]}"
    exit 0
  end

  # sleep TICK_SECS

  @ins[0] = batch_sizes[0] if @ins[0] == 0

  (0..3).to_a.reverse.each do |worker|
    if @outs[worker] >= batch_sizes[worker]
      if ready_for_new_batch(worker+1)
        @outs[worker] = @outs[worker] - batch_sizes[worker]
        @ins[worker+1] = @ins[worker+1] + batch_sizes[worker]
        if worker == 2
          step_size = step_size + 1
          # batch_sizes[worker] = batch_sizes[worker] + TECH_DEBT_COST
        end
      end
    elsif @ins[worker] > 0
      if worker != 2 || step % step_size == 0
        @ins[worker] = @ins[worker] - 1
        @outs[worker] = @outs[worker] + 1
      end
    end
    # display_state
  end
  step = step + 1
end
